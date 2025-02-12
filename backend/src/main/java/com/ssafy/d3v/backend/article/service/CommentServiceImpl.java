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
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
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
                .map(c -> CommentResponse.builder()
                        .id(c.getId())
                        .articleId(c.getArticle().getId())
                        .memberId(c.getMember().getId())
                        .content(c.getContent())
                        .createdAt(c.getCreatedAt())
                        .updatedAt(c.getUpdatedAt())
                        .build())
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

        articleRepository.save(article.toBuilder()
                .commentCount(article.getCommentCount() + 1)
                .build());

        return CommentResponse.builder()
                .id(saved.getId())
                .articleId(saved.getArticle().getId())
                .memberId(saved.getMember().getId())
                .content(saved.getContent())
                .createdAt(saved.getCreatedAt())
                .updatedAt(saved.getUpdatedAt())
                .build();
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

        return CommentResponse.builder()
                .id(updated.getId())
                .articleId(updated.getId())
                .memberId(updated.getMember().getId())
                .content(updated.getContent())
                .createdAt(updated.getCreatedAt())
                .updatedAt(updated.getUpdatedAt())
                .build();
    }

    @Override
    @Transactional
    public void delete(Long articleId, Long commentId) {
        Member member = getMemberById(memberId);
        Comment comment = getComment(commentId, member);

        commentRepository.delete(comment);
    }

    private Comment getComment(Long commentId, Member member) {
        return commentRepository.findByIdAndMember(commentId, member)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글이 존재하지 않습니다." + commentId));
    }

    private Article getArticleById(Long articleId) {
        return articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다." + articleId));
    }

    private Member getMemberById(long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 입니다. 회원 ID: " + memberId));
        return member;
    }
}