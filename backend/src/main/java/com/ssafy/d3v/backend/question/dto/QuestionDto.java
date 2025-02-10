package com.ssafy.d3v.backend.question.dto;

import com.ssafy.d3v.backend.question.entity.Question;
import lombok.Builder;

@Builder
public record QuestionDto(
        Long id,
        String content,
        String standardAnswer,
        Long answerCount,
        Long challengeCount
) {
    public static QuestionDto from(Question question) {
        return QuestionDto.builder()
                .id(question.getId())
                .content(question.getContent())
                .standardAnswer(question.getStandardAnswer())
                .answerCount(question.getAnswerCount())
                .challengeCount(question.getChallengeCount())
                .build();
    }
}
