package com.ssafy.d3v.backend.article.dto;

import com.ssafy.d3v.backend.article.entity.ArticleImage;
import com.ssafy.d3v.backend.article.entity.CategoryName;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record ArticleDetailResponse(long id, long categoryId, long memberId, CategoryName name,
                                    String title, String content, List<ArticleImage> images,
                                    LocalDateTime createdAt, LocalDateTime updatedAt,
                                    int view, int commentCount) {
}
