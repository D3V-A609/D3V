package com.ssafy.d3v.backend.question.repository;

import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.JobSkill;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface JobSkillRepository extends JpaRepository<JobSkill, Long> {

    @Query("SELECT s.name FROM JobSkill js " +
            "JOIN js.job j " +
            "JOIN js.skill s " +
            "WHERE j.jobRole = :jobRole")
    List<String> findSkillsByJobRole(@Param("jobRole") JobRole jobRole);
}

