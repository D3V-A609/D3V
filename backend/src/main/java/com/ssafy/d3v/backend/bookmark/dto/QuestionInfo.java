package com.ssafy.d3v.backend.bookmark.dto;

import com.ssafy.d3v.backend.question.entity.Question;
import lombok.Builder;

@Builder
public record QuestionInfo(
        Long questionId,
        String content,
        String skill
) {
    public static QuestionInfo from(Question question) {
        return QuestionInfo.builder()
                .questionId(question.getId())
                .content(question.getContent())
                .skill(String.valueOf(question.getQuestionSkills().get(0)))
                .build();
    }
}
