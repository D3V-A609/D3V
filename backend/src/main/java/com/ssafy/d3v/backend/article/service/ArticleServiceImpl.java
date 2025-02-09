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
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleCustomRepository articleCustomRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final S3ImageUploader s3ImageUploader;

    private final Long memberId = 1L;

    @Override
    public PagedResponse<ArticleResponse> get(String categoryName, String keyword, int page, int size,
                                              String sort) {
        Category category = categoryRepository.findByName(CategoryName.valueOf(categoryName))
                .orElseThrow(() -> new IllegalArgumentException("해당 카테고리가 존재하지 않습니다." + categoryName));

        Sort sortBy = switch (sort.toUpperCase()) {
            case LATEST_SORT -> Sort.by(Sort.Direction.DESC, "createdAt");
            case VIEW_SORT -> Sort.by(Sort.Direction.DESC, "view");
            case COMMENT_SORT -> Sort.by(Sort.Direction.DESC, "commentCount");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
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

}
