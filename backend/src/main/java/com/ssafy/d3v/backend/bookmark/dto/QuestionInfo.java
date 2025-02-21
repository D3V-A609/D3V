package com.ssafy.d3v.backend.bookmark.dto;

import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.SkillType;
import lombok.Builder;

@Builder
public record QuestionInfo(
        Long questionId,
        String content,
        SkillType skill
) {
    public static QuestionInfo from(Question question) {
        return QuestionInfo.builder()
                .questionId(question.getId())
                .content(question.getContent())
                .skill(question.getQuestionSkills().get(0).getSkill().getName())
                .build();
    }
}
