package com.ssafy.d3v.backend.question.controller;

import com.ssafy.d3v.backend.question.controller.dto.DailyQuestionCreate;
import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.service.QuestionQueryService;
import com.ssafy.d3v.backend.question.service.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
@Tag(name = "질문", description = "질문 관련 API")
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionQueryService questionQueryService;
    @Operation(summary = "질문 상세 조회", description = "주어진 질문 ID에 해당하는 질문의 상세 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 질문을 조회함",
                    content = @Content(schema = @Schema(implementation = Question.class))),
            @ApiResponse(responseCode = "404", description = "질문을 찾을 수 없음")
    })
    @GetMapping("/{question_id}")
    public ResponseEntity<Question> getQuestionDetail(
            @Parameter(description = "조회할 질문의 ID") @PathVariable("question_id") Long questionId) {
        return ResponseEntity
                .ok()
                .body(questionService.getById(questionId));
    }
    @GetMapping("/daily")
    public ResponseEntity<List<DailyQuestionCreate>> getDailyQuestions() {
        List<Question> questions = questionService.getDailyQuestions();

        List<DailyQuestionCreate> dailyQuestionCreateList = questions.stream()
                .map(q ->{
                    List<Skill> skills = questionQueryService.getSkillsByQuestionId(q.getId());
                    List<Job> jobs = questionQueryService.getJobsByQuestionId(q.getId());
                    return DailyQuestionCreate.builder()
                            .questionId(q.getId())
                            .content(q.getContent())
                            .standardAnswer(q.getStandardAnswer())
                            .skillList(skills.stream().map(Skill::getName).toList())
                            .jobList(jobs.stream().map(Job::getDevelopmentRole).toList())
                            .build();
                })
                .toList();
        return ResponseEntity
                .ok()
                .body(dailyQuestionCreateList);
    }
}
