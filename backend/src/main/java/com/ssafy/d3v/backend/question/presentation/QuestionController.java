package com.ssafy.d3v.backend.question.presentation;

import com.ssafy.d3v.backend.question.domain.Question;
import com.ssafy.d3v.backend.question.application.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/question")
@Tag(name = "질문", description = "질문 관련 API")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @Operation(summary = "질문 상세 조회", description = "주어진 질문 ID에 해당하는 질문의 상세 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 질문을 조회함",
                    content = @Content(schema = @Schema(implementation = Question.class))),
            @ApiResponse(responseCode = "404", description = "질문을 찾을 수 없음")
    })
    @GetMapping("/{question_id}")
    public ResponseEntity<Question> getQuestionDetail(
            @Parameter(description = "조회할 질문의 ID") @PathVariable("question_id") int questionId) {
        return ResponseEntity
                .ok()
                .body(questionService.getById(questionId));
    }
}
