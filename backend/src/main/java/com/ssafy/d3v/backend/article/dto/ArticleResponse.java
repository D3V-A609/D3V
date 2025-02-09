package com.ssafy.d3v.backend.article.dto;

import com.ssafy.d3v.backend.article.entity.CategoryName;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record ArticleResponse(long id, long categoryId, CategoryName name,
                              String title, LocalDateTime createdAt, LocalDateTime updatedAt,
                              int view, int commentCount) {
}
