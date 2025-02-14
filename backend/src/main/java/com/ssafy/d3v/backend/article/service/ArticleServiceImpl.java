package com.ssafy.d3v.backend.article.service;

import static com.ssafy.d3v.backend.common.constant.ArticleConstant.COMMENT_SORT;
import static com.ssafy.d3v.backend.common.constant.ArticleConstant.LATEST_SORT;
import static com.ssafy.d3v.backend.common.constant.ArticleConstant.VIEW_SORT;

import com.ssafy.d3v.backend.article.dto.ArticleDetailResponse;
import com.ssafy.d3v.backend.article.dto.ArticleResponse;
import com.ssafy.d3v.backend.article.entity.Article;
import com.ssafy.d3v.backend.article.entity.ArticleImage;
import com.ssafy.d3v.backend.article.entity.Category;
import com.ssafy.d3v.backend.article.entity.CategoryName;
import com.ssafy.d3v.backend.article.repository.ArticleCustomRepository;
import com.ssafy.d3v.backend.article.repository.ArticleRepository;
import com.ssafy.d3v.backend.article.repository.CategoryRepository;
import com.ssafy.d3v.backend.common.dto.PagedResponse;
import com.ssafy.d3v.backend.common.dto.PaginationInfo;
import com.ssafy.d3v.backend.common.util.S3ImageUploader;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleCustomRepository articleCustomRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final S3ImageUploader s3ImageUploader;

    private final Long memberId = 1L;

    @Override
    public PagedResponse<ArticleResponse> get(String categoryName, String keyword,
                                              int page, int size, String sort, String order) {
        Category category = null;
        if (categoryName != null) {
            category = categoryRepository.findByName(CategoryName.valueOf(categoryName))
                    .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다. " + categoryName));
        }

        Sort sortBy = switch (sort.toUpperCase()) {
            case LATEST_SORT -> Sort.by(Sort.Direction.valueOf(order), "createdAt");
            case VIEW_SORT -> Sort.by(Sort.Direction.valueOf(order), "view");
            case COMMENT_SORT -> Sort.by(Sort.Direction.valueOf(order), "commentCount");
            default -> Sort.by(Sort.Direction.valueOf(order), "createdAt");
        };

        Pageable pageable = PageRequest.of(page - 1, size, sortBy);
        Page<Article> articles = articleCustomRepository.findByCategory(category, keyword, pageable);

        List<ArticleResponse> articleResponses = articles.stream()
                .map(a -> ArticleResponse.builder()
                        .id(a.getId())
                        .categoryId((a.getCategory() != null) ? a.getCategory().getId() : null)
                        .name((a.getCategory() != null) ? a.getCategory().getName() : null)
                        .title(a.getTitle())
                        .createdAt(a.getCreatedAt())
                        .updatedAt(a.getUpdatedAt())
                        .view(a.getView())
                        .commentCount(a.getCommentCount())
                        .build())
                .collect(Collectors.toList());

        return new PagedResponse<>(articleResponses, PaginationInfo.from(articles));
    }

    @Override
    @Transactional
    public ArticleDetailResponse create(long categoryId, String title, String content, List<MultipartFile> images) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다."));

        Member member = getMember(memberId);

        Article article = Article.builder()
                .member(member)
                .category(category)
                .title(title)
                .content(content)
                .view(0)
                .commentCount(0)
                .build();

        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    String imageUrl = s3ImageUploader.upload(image);
                    ArticleImage articleImage = ArticleImage.builder()
                            .originImageName(image.getOriginalFilename())
                            .imageUrl(imageUrl)
                            .build();

                    article.addImage(articleImage);
                }
            }
        }

        Article created = articleRepository.saveAndFlush(article);
        return getArticleResponse(created);
    }

    private Member getMember(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("멤버가 존재하지 않습니다." + memberId));
    }

    @Override
    @Transactional
    public ArticleDetailResponse getDetail(long articleId) {
        Article article = getArticle(articleId);
        Article updated = articleRepository.saveAndFlush(
                article.toBuilder()
                        .view(article.getView() + 1)
                        .build());

        return getArticleResponse(updated);
    }

    @Override
    @Transactional
    public ArticleDetailResponse update(long articleId, long categoryId, String title, String content,
                                        List<MultipartFile> images) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다."));

        Article article = getArticle(articleId);

        article.getImageUrls().forEach(image -> s3ImageUploader.deleteImageFromS3(image.getImageUrl()));
        article.getImageUrls().clear();

        List<ArticleImage> newImageEntities = new ArrayList<>();

        if (images != null && !images.isEmpty()) {
            images.stream()
                    .filter(image -> !image.isEmpty())
                    .forEach(image -> {
                        String originImageName = image.getOriginalFilename();
                        String imageUrl = s3ImageUploader.upload(image);

                        ArticleImage newImage = ArticleImage.builder()
                                .originImageName(originImageName)
                                .imageUrl(imageUrl)
                                .article(article)
                                .build();

                        newImageEntities.add(newImage);
                    });
        }

        article.getImageUrls().addAll(newImageEntities);

        Article updated = article.toBuilder()
                .category(category)
                .title(title)
                .content(content)
                .build();

        return getArticleResponse(articleRepository.saveAndFlush(updated));
    }

    private static ArticleDetailResponse getArticleResponse(Article article) {
        return ArticleDetailResponse.builder()
                .id(article.getId())
                .categoryId(article.getCategory().getId())
                .memberId(article.getMember().getId())
                .name(article.getCategory().getName())
                .title(article.getTitle())
                .content(article.getContent())
                .images(article.getImageUrls())
                .createdAt(article.getCreatedAt())
                .updatedAt(article.getUpdatedAt())
                .view(article.getView())
                .commentCount(article.getCommentCount())
                .build();
    }

    @Override
    @Transactional
    public void delete(long articleId) {
        Article article = getArticle(articleId);

        article.delete(); //s3 이미지는 삭제하지 않음
        articleRepository.saveAndFlush(article);
    }

    private Article getArticle(long articleId) {
        return articleRepository.findByIdAndDeletedAtIsNull(articleId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. " + articleId));
    }

    @Override
    public List<ArticleResponse> getMyArticles(long memberId) {
        Member member = getMember(memberId);
        List<Article> articles = articleRepository.findByMemberAndDeletedAtIsNullOrderByCreatedAtDesc(member);

        return articles.stream()
                .map(a -> ArticleResponse.builder()
                        .id(a.getId())
                        .categoryId(a.getCategory().getId())
                        .name(a.getCategory().getName())
                        .title(a.getTitle())
                        .createdAt(a.getCreatedAt())
                        .updatedAt(a.getUpdatedAt())
                        .view(a.getView())
                        .commentCount(a.getCommentCount())
                        .build())
                .collect(Collectors.toList());
    }
}
