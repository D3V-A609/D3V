package com.ssafy.d3v.backend.question.controller.dto;

import com.ssafy.d3v.backend.question.entity.ServedQuestion;
import lombok.Builder;

@Builder
public record ServedQuestionCreate(
        Long memberId,
        Long questionId,
        Boolean isSolved
) {
}
