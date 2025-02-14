package com.ssafy.d3v.backend.article.repository;

import com.ssafy.d3v.backend.article.entity.Article;
import com.ssafy.d3v.backend.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findByIdAndDeletedAtIsNull(Long articleId);

    List<Article> findByMemberAndDeletedAtIsNullOrderByCreatedAtDesc(Member member);
}
