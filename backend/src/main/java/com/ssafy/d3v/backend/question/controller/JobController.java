package com.ssafy.d3v.backend.question.controller;

import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.service.JobService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/job")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @GetMapping()
    public ResponseEntity<List<JobRole>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

}
