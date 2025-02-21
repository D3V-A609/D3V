package com.ssafy.d3v.backend.question.dto;

import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.JobRole;
import lombok.Builder;

@Builder
public record JobDto(
        Long id,
        JobRole jobRole
) {
    public static JobDto from(Job job) {
        return JobDto.builder()
                .id(job.getId())
                .jobRole(job.getJobRole())
                .build();
    }
}
