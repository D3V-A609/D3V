package com.ssafy.d3v.backend.article.repository;

import com.ssafy.d3v.backend.article.entity.Article;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findByIdAndDeletedAtIsNull(Long articleId);
}
