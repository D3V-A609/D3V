package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.QuestionJob;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.repository.JobRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Question> getQuestionsByJob(String jobRole) {
        Job job = jobRepository.findByJobRole(JobRole.valueOf(jobRole.toUpperCase()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid Job Role"));

        return job.getQuestionJobs().stream()
                .map(QuestionJob::getQuestion)
                .toList();
    }

    public List<Skill> getSkillsByJobs(List<String> jobs) {
        List<JobRole> jobRoles = jobs.stream()
                .map(role -> JobRole.valueOf(role.toUpperCase())) // 문자열을 대문자로 변환 후 Enum으로 매핑
                .toList();

        return jobRepository.findSkillsByJobRoles(jobRoles);
    }
}


