package com.ssafy.d3v.backend.question.repository;

import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.question.dto.QuestionResponse;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.SkillType;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;

public interface QuestionCustomRepository {
    List<Question> findTop10QuestionsByAnswerCount(LocalDateTime startDate, LocalDateTime endDate, JobRole jobRole);

    Page<QuestionResponse> searchQuestions(List<JobRole> jobRoles, List<SkillType> skillTypes, Member member,
                                           String solvedFilter, String order, String sort, int page, int size,
                                           String keyword);
}
