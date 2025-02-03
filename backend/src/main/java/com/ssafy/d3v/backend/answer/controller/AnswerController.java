package com.ssafy.d3v.backend.answer.controller;

import com.ssafy.d3v.backend.answer.dto.AnswerRequest;
import com.ssafy.d3v.backend.answer.dto.AnswerResponse;
import com.ssafy.d3v.backend.answer.dto.LatestQuestionResponse;
import com.ssafy.d3v.backend.answer.dto.StandardAnswerResponse;
import com.ssafy.d3v.backend.answer.service.AnswerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "답변", description = "답변 API")
public class AnswerController {
    private final AnswerService answerService;

    @GetMapping("/question/{question_id}/standard_answer")
    public ResponseEntity<StandardAnswerResponse> getStandardAnswer(@PathVariable("question_id") long questionId) {
        return ResponseEntity.ok().body(answerService.getStandardAnswer(questionId));
    }

    @PostMapping("/question/{question_id}/answer")
    public ResponseEntity<List<AnswerResponse>> create(@PathVariable("question_id") long questionId, AnswerRequest answerRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(answerService.create(questionId, answerRequest));
    }

    @GetMapping("/question/{question_id}/my_answer")
    public ResponseEntity<List<AnswerResponse>> getMyAnswers(@PathVariable("question_id") long questionId) {
        return ResponseEntity.ok().body(answerService.getMyAnswers(questionId));
    }

}
