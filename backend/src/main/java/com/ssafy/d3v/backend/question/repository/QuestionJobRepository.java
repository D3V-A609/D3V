package com.ssafy.d3v.backend.question.repository;

import com.ssafy.d3v.backend.question.entity.QuestionJob;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// QuestionJobRepository.java
public interface QuestionJobRepository extends JpaRepository<QuestionJob, Long> {

    @Query("SELECT qj FROM QuestionJob qj " +
            "JOIN FETCH qj.job " +  // Job 엔티티 즉시 로딩
            "WHERE qj.question.id = :questionId")
    List<QuestionJob> findAllByQuestionIdWithJob(@Param("questionId") Long questionId);
}
