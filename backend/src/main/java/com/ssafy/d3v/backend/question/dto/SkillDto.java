package com.ssafy.d3v.backend.question.dto;

import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.entity.SkillType;
import lombok.Builder;

@Builder
public record SkillDto(
        Long id,
        SkillType name
) {
    public static SkillDto from(Skill skill) {
        return SkillDto.builder()
                .id(skill.getId())
                .name(skill.getName())
                .build();
    }
}
