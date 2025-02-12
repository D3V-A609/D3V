package com.ssafy.d3v.backend.answer.dto;

import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.entity.SkillType;
import java.util.List;
import lombok.Builder;

@Builder
public record AnswerQuestionResponse(long questionId, String content,
                                     boolean isSolved, List<SkillType> skillList) {
    public static AnswerQuestionResponse from(long questionId, String content,
                                              boolean isSolved, List<Skill> skills) {
        return AnswerQuestionResponse.builder()
                .questionId(questionId)
                .content(content)
                .isSolved(isSolved)
                .skillList(skills.stream().map(Skill::getName).toList())
                .build();
    }
}
