package com.ssafy.d3v.backend.question.dto;

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
        Boolean isBookmarked,
        //List<JobRole> jobList,
        List<SkillType> skillList

) {
    public static QuestionResponse of(QuestionDto q,
                                      String solved,
                                      List<SkillDto> skills,
                                      //List<JobDto> jobs,
                                      Boolean bookmarked) {
        return QuestionResponse.builder()
                .id(q.id())
                .content(q.content())
                .standardAnswer(q.standardAnswer())
                .answerCount(q.answerCount())
                .challengeCount(q.challengeCount())
                .answerAverage(Math.round(q.answerAverage() * 100.0) / 100.0)
                .status(solved)
                .skillList(skills.stream().map(SkillDto::name).toList())
                //.jobList(jobs.stream().map(JobDto::jobRole).toList())
                .isBookmarked(bookmarked)
                .build();
    }

}
