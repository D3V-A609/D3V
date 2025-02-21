package com.ssafy.d3v.backend.question.dto;

import lombok.Builder;

@Builder
public record ServedQuestionCreateRequest(
        Long memberId,
        Long questionId,
        Boolean isSolved
) {
}
