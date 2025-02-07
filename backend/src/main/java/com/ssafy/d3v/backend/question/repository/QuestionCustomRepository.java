package com.ssafy.d3v.backend.question.repository;

import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.Question;
import java.time.LocalDateTime;
import java.util.List;

public interface QuestionCustomRepository {
    List<Question> findTop10QuestionsByAnswerCount(LocalDateTime startDate, LocalDateTime endDate, JobRole jobRole);
}
