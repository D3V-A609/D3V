package com.ssafy.d3v.backend.question.dto;

import com.ssafy.d3v.backend.question.entity.DevelopmentRole;
import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.entity.SkillType;
import java.util.List;
import java.util.Random;
import lombok.Builder;

@Builder
public record QuestionResponse(
        Long questionId,
        String content,
        String standardAnswer,
        String status,
        Integer challengeCount,
        Integer answerCount,
        List<SkillType> skillList,
        List<DevelopmentRole> jobList
) {
    public  static QuestionResponse from(Question question, List<Skill> skills, List<Job> jobs) {
        // 임시 랜덤값 생성 코드
        Random random = new Random();
        String tempStatus = random.nextBoolean() ? "solved" : "unsolved";
        int tempChallengeCount = random.nextInt(21); // 0부터 20까지
        int tempAnswerCount = tempChallengeCount + random.nextInt((51 - tempChallengeCount));

        return QuestionResponse.builder()
                .questionId(question.getId())
                .content(question.getContent())
                .standardAnswer(question.getStandardAnswer())
                .status(tempStatus)
                .challengeCount(tempChallengeCount)
                .answerCount(tempAnswerCount)
                .skillList(skills.stream().map(Skill::getName).toList())
                .jobList(jobs.stream().map(Job::getDevelopmentRole).toList())
                .build();
    }
}
