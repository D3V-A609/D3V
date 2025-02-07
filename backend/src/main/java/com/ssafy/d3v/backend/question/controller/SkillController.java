package com.ssafy.d3v.backend.question.controller;

import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.service.SkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/skill")
@RequiredArgsConstructor
@Tag(name = "기술", description = "기술 관련 API")
public class SkillController {
    private final SkillService skillService;

    @GetMapping("/{skillName}/questions")
    @Operation(summary = "한 기술에 대한 질문들 조회", description = "하나의 기술에 대한 질문을 전부 조회합니다.")
    public List<Question> getQuestionsBySkill(@PathVariable String skillName) {
        return skillService.getQuestionsBySkillName(skillName);
    }

    @GetMapping("/{skillName}/jobs")
    @Operation(summary = "한 기술에 대한 직무들 조회", description = "하나의 기술에 대한 직무를 전부 조회합니다.")
    public List<Job> getJobsBySkill(@PathVariable String skillName) {
        return skillService.getJobsBySkillName(skillName);
    }
}
