package com.ssafy.d3v.backend.question.dto;

import com.ssafy.d3v.backend.question.entity.ServedQuestion;
import java.time.LocalDate;
import lombok.Builder;

@Builder
public record ServedQuestionDto(
        Long servedQuestionId,
        Long memberId,
        Long questionId,
        boolean isSolved,
        boolean isDaily,
        LocalDate servedAt
) {
    public static ServedQuestionDto from(ServedQuestion servedQuestion) {
        return ServedQuestionDto.builder()
                .servedQuestionId(servedQuestion.getId())
                .memberId(servedQuestion.getMember().getId())
                .questionId(servedQuestion.getQuestion().getId())
                .isSolved(servedQuestion.getIsSolved())
                .isDaily(servedQuestion.getIsDaily())
                .servedAt(servedQuestion.getServedAt())
                .build();
    }
}

