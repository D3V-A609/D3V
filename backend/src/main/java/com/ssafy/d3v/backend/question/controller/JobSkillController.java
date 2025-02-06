package com.ssafy.d3v.backend.question.controller;

import com.ssafy.d3v.backend.question.service.JobSkillService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/skill")
@RequiredArgsConstructor
public class JobSkillController {

    private final JobSkillService jobSkillService;

    @GetMapping()
    public ResponseEntity<List<String>> getSkillsByJobRole(@RequestParam String job) {
        List<String> skills = jobSkillService.getSkillsByJobRole(job);
        return ResponseEntity.ok(skills);
    }
}
