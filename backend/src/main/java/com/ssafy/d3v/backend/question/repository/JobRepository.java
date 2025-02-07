package com.ssafy.d3v.backend.question.repository;

import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.Skill;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    Optional<Job> findByJobRole(JobRole jobRole);

    // 여러 JobRole에 해당하는 JobSkill의 Skill 데이터를 조회
    @Query("SELECT DISTINCT js.skill FROM JobSkill js WHERE js.job.jobRole IN :jobRoles")
    List<Skill> findSkillsByJobRoles(@Param("jobRoles") List<JobRole> jobRoles);
}
