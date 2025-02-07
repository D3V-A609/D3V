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
        Long answerCount,
        Long challengeCount,
        Double answerAverage,
        String status,
        List<SkillType> skillList,
        List<JobRole> jobList
) {
    public static QuestionResponse from(Question q, String Status, List<Skill> skills, List<Job> jobs) {
        return QuestionResponse.builder()
                .questionId(q.getId())
                .content(q.getContent())
                .standardAnswer(q.getStandardAnswer())
                .answerCount(q.getAnswerCount())
                .challengeCount(q.getChallengeCount())
                .answerAverage(q.getChallengeCount() == 0
                        ? 0.0
                        : Math.round((q.getAnswerCount() / (double) q.getChallengeCount()) * 1000) / 1000.0)
                .status(Status)
                .skillList(skills.stream().map(Skill::getName).toList())
                .jobList(jobs.stream().map(Job::getJobRole).toList())
                .build();
    }

}
