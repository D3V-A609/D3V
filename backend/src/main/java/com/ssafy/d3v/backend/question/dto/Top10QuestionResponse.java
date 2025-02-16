package com.ssafy.d3v.backend.question.dto;

import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.SkillType;
import java.util.List;
import lombok.Builder;

@Builder
public record Top10QuestionResponse(
        Long id,
        String content,
        String standardAnswer,
        Long answerCount,
        Long challengeCount,
        Double answerAverage,
        List<SkillType> skillList,
        List<JobRole> jobList
) {
    public static Top10QuestionResponse of(QuestionDto q, List<SkillDto> skills, List<JobDto> jobs) {
        return Top10QuestionResponse.builder()
                .id(q.id())
                .content(q.content())
                .standardAnswer(q.standardAnswer())
                .answerCount(q.answerCount())
                .challengeCount(q.challengeCount())
                .answerAverage(q.answerAverage())
                .skillList(skills.stream().map(SkillDto::name).toList())
                .jobList(jobs.stream().map(JobDto::jobRole).toList())
                .build();
    }

}
