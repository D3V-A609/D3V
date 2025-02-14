package com.ssafy.d3v.backend.article.repository;

import com.ssafy.d3v.backend.article.entity.Article;
import com.ssafy.d3v.backend.article.entity.Comment;
import com.ssafy.d3v.backend.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByArticle(Article article, Pageable pageable);

    Optional<Comment> findByIdAndMember(Long commentId, Member member);

    List<Comment> findByMemberAndDeletedAtIsNullOrderByCreatedAtDesc(Member member);
}
