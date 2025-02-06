package com.ssafy.d3v.backend.question.dto;

import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.entity.SkillType;
import java.util.List;
import lombok.Builder;

@Builder
public record QuestionResponse(
        Long questionId,
        String content,
        String standardAnswer,
        List<SkillType> skillList,
        List<JobRole> jobList
) {
    public static QuestionResponse from(Question question, List<Skill> skills, List<Job> jobs) {
        return QuestionResponse.builder()
                .questionId(question.getId())
                .content(question.getContent())
                .standardAnswer(question.getStandardAnswer())
                .skillList(skills.stream().map(Skill::getName).toList())
                .jobList(jobs.stream().map(Job::getJobRole).toList())
                .build();
    }
}
