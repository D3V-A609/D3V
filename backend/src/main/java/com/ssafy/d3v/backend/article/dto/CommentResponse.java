package com.ssafy.d3v.backend.article.dto;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record CommentResponse(long id, long articleId, long memberId, String content,
                              LocalDateTime createdAt, LocalDateTime updatedAt) {
}
