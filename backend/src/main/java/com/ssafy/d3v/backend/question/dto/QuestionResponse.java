package com.ssafy.d3v.backend.question.dto;

import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.entity.SkillType;
import java.util.List;
import lombok.Builder;

@Builder
public record QuestionResponse(
        Long id,
        String content,
        String standardAnswer,
        Long answerCount,
        Long challengeCount,
        Double answerAverage,
        String status,
        List<SkillType> skillList,
        List<JobRole> jobList
) {
    public static QuestionResponse of(QuestionDto q, String solved, List<Skill> skills, List<Job> jobs) {
        return QuestionResponse.builder()
                .id(q.id())
                .content(q.content())
                .standardAnswer(q.standardAnswer())
                .answerCount(q.answerCount())
                .challengeCount(q.challengeCount())
                .answerAverage(q.answerAverage())
                .status(solved)
                .skillList(skills.stream().map(Skill::getName).toList())
                .jobList(jobs.stream().map(Job::getJobRole).toList())
                .build();
    }

}
