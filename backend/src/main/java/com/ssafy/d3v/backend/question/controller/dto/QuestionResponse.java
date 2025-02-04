package com.ssafy.d3v.backend.question.controller.dto;

import com.ssafy.d3v.backend.question.entity.DevelopmentRole;
import com.ssafy.d3v.backend.question.entity.SkillType;
import java.util.List;
import lombok.Builder;

@Builder
public record QuestionResponse(
        Long questionId,
        String content,
        String standardAnswer,
        List<SkillType> skillList,
        List<DevelopmentRole> jobList
) {
}
