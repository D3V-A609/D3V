package com.ssafy.d3v.backend.question.repository;

import com.ssafy.d3v.backend.question.entity.QuestionJob;
import com.ssafy.d3v.backend.question.entity.QuestionSkill;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// QuestionSkillRepository.java
public interface QuestionSkillRepository extends JpaRepository<QuestionSkill, Long> {

    @Query("SELECT qs FROM QuestionSkill qs " +
            "JOIN FETCH qs.skill " +  // Skill 엔티티 즉시 로딩
            "WHERE qs.question.Id = :questionId")
    List<QuestionSkill> findAllByQuestionIdWithSkill(@Param("questionId") Long questionId);
}

