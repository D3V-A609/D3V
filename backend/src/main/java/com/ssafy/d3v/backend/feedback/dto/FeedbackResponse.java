package com.ssafy.d3v.backend.feedback.dto;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record FeedbackResponse(long feedbackId, long answerId, long memberId,
                               String content, LocalDateTime createdAt, LocalDateTime updatedAt) {
}
