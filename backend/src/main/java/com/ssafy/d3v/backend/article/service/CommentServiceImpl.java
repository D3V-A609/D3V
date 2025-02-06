package com.ssafy.d3v.backend.article.service;

import com.ssafy.d3v.backend.article.dto.CommentRequest;
import com.ssafy.d3v.backend.article.dto.CommentResponse;
import com.ssafy.d3v.backend.article.entity.Article;
import com.ssafy.d3v.backend.article.entity.Comment;
import com.ssafy.d3v.backend.article.repository.ArticleRepository;
import com.ssafy.d3v.backend.article.repository.CommentRepository;
import com.ssafy.d3v.backend.common.dto.PagedResponse;
import com.ssafy.d3v.backend.common.dto.PaginationInfo;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final Long memberId = 1L;

    @Override
    public PagedResponse<CommentResponse> get(Long articleId, int page, int size) {
        Article article = getArticleById(articleId);
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Comment> commentsPage = commentRepository.findByArticle(article, pageable);

        List<CommentResponse> commentResponses = commentsPage.getContent().stream()
                .map(c -> new CommentResponse(c.getId(), c.getArticle().getId(), c.getContent(), c.getCreatedAt(), c.getUpdatedAt()))
                .toList();

        PaginationInfo paginationInfo = PaginationInfo.from(commentsPage);

        return new PagedResponse<>(commentResponses, paginationInfo);
    }

    @Override
    @Transactional
    public CommentResponse create(Long articleId, CommentRequest commentRequest) {
        Member member = getMemberById(memberId);
        Article article = getArticleById(articleId);

        Comment comment = Comment.builder()
                .article(article)
                .member(member)
                .content(commentRequest.content())
                .build();

        Comment saved = commentRepository.saveAndFlush(comment);
        return new CommentResponse(
                saved.getId(),
                saved.getArticle().getId(),
                saved.getContent(),
                saved.getCreatedAt(),
                saved.getUpdatedAt());
    }

    @Override
    @Transactional
    public CommentResponse update(Long articleId, Long commentId, CommentRequest commentRequest) {
        Member member = getMemberById(memberId);
        Comment comment = getComment(commentId, member);

        Comment updated = commentRepository.save(
                comment.toBuilder()
                .content(commentRequest.content())
                .build());

        return new CommentResponse(
                updated.getId(),
                updated.getArticle().getId(),
                updated.getContent(),
                updated.getCreatedAt(),
                updated.getUpdatedAt());
    }
}