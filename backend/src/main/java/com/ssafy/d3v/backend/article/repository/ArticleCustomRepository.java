package com.ssafy.d3v.backend.article.repository;

import static com.ssafy.d3v.backend.article.entity.QArticle.article;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.d3v.backend.article.entity.Article;
import com.ssafy.d3v.backend.article.entity.Category;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleCustomRepository {
    private final JPAQueryFactory queryFactory;

    public Page<Article> findByCategory(Category category, String keyword, Pageable pageable) {
        BooleanBuilder whereClause = new BooleanBuilder();

        if (category != null) {
            whereClause.and(article.category.eq(category));
        }

        if (keyword != null && !keyword.isEmpty()) {
            whereClause.and(article.title.containsIgnoreCase(keyword));
        }

        whereClause.and(article.deletedAt.isNull());

        List<Article> articles = queryFactory
                .selectFrom(article)
                .leftJoin(article.category).fetchJoin()
                .where(whereClause)
                .orderBy(getSortOrder(pageable.getSort()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long totalRecords = queryFactory
                .select(article.count())
                .from(article)
                .leftJoin(article.category)
                .where(whereClause)
                .fetchOne();

        return new PageImpl<>(articles, pageable, totalRecords);
    }

    private OrderSpecifier<?> getSortOrder(Sort sort) {
        for (Sort.Order order : sort) {
            switch (order.getProperty()) {
                case "view":
                    return order.isAscending() ? article.view.asc() : article.view.desc();
                case "commentCount":
                    return order.isAscending() ? article.commentCount.asc() : article.commentCount.desc();
                default:
                    return order.isAscending() ? article.createdAt.asc() : article.createdAt.desc();
            }
        }
        return article.createdAt.desc();
    }
}
