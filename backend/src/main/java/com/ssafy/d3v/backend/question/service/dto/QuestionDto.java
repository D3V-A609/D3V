package com.ssafy.d3v.backend.question.service.dto;

import com.ssafy.d3v.backend.question.entity.Question;
import lombok.Builder;

@Builder
public record QuestionDto(
        Long questionId,
        String content,
        String standardAnswer
) {
    public static QuestionDto from(Question question) {
        return QuestionDto.builder()
                .questionId(question.getId())
                .content(question.getContent())
                .standardAnswer(question.getStandardAnswer())
                .build();
    }
}