package com.ssafy.d3v.backend.question.controller;

import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.entity.SkillType;
import com.ssafy.d3v.backend.question.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/job")
@RequiredArgsConstructor
@Tag(name = "직무", description = "직무 관련 API")
public class JobController {
    private final JobService jobService;

    @GetMapping()
    @Operation(summary = "직무 전체 조회", description = "모든 직무를 조회합니다.")
    public ResponseEntity<List<JobRole>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs().stream().map(Job::getJobRole).toList());
    }

    @PostMapping("/skills")
    @Operation(summary = "여러 직무에 대한 기술들 조회", description = "선택된 여러 개의 직무에 대한 기술들을 중복없이 전부 조회합니다.")
    public List<SkillType> getSkillsByJobs(@RequestBody List<String> jobs) {
        return jobService.getSkillsByJobs(jobs).stream().map(Skill::getName).toList();
    }

//    @GetMapping("/{jobRole}/questions")
//    @Operation(summary = "한 직무에 대한 질문들 조회", description = "하나의 직무에 대한 질문을 전부 조회합니다.")
//    public List<Question> getQuestionsByJob(@PathVariable String jobRole) {
//        return jobService.getQuestionsByJob(jobRole);
//    }
}
