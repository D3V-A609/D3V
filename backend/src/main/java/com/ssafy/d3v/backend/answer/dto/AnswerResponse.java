package com.ssafy.d3v.backend.answer.dto;

import com.ssafy.d3v.backend.common.util.AccessLevel;
import java.time.LocalDateTime;

public record AnswerResponse(long questionId, long memberId, long answerId,
                             String content, LocalDateTime createdAt, AccessLevel accessLevel,
                             int count, int like) {
}
