package com.ssafy.d3v.backend.answer.controller;

import com.ssafy.d3v.backend.answer.dto.AnswerQuestionResponse;
import com.ssafy.d3v.backend.answer.dto.AnswerRequest;
import com.ssafy.d3v.backend.answer.dto.AnswerResponse;
import com.ssafy.d3v.backend.answer.dto.StandardAnswerResponse;
import com.ssafy.d3v.backend.answer.dto.TextAnswerResponse;
import com.ssafy.d3v.backend.answer.service.AnswerService;
import com.ssafy.d3v.backend.common.dto.PagedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "답변", description = "답변 API")
public class AnswerController {
    private final AnswerService answerService;

    @Operation(summary = "모범 답변 조회")
    @GetMapping("/question/{question_id}/standard_answer")
    public ResponseEntity<StandardAnswerResponse> getStandardAnswer(@PathVariable("question_id") long questionId) {
        return ResponseEntity.ok().body(answerService.getStandardAnswer(questionId));
    }

    @Operation(summary = "답변 생성")
    @PostMapping("/question/{question_id}/answer")
    public ResponseEntity<List<AnswerResponse>> create(@PathVariable("question_id") long questionId,
                                                       @RequestBody AnswerRequest answerRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(answerService.create(questionId, answerRequest));
    }

    @Operation(summary = "내 답변 전체 조회")
    @GetMapping("/question/{question_id}/my_answer")
    public ResponseEntity<List<AnswerResponse>> getMyAnswers(@PathVariable("question_id") long questionId) {
        return ResponseEntity.ok().body(answerService.getMyAnswers(questionId));
    }

    @Operation(summary = "답변 전체 조회(다른 사용자 답변 보기)")
    @GetMapping("/question/{question_id}/answer")
    public ResponseEntity<PagedResponse<AnswerResponse>> getTotalAnswers(@PathVariable("question_id") long questionId,
                                                                         @RequestParam(value = "size", defaultValue = "15") int size,
                                                                         @RequestParam(value = "page", defaultValue = "1") int page) {
        return ResponseEntity.ok().body(answerService.getTotalAnswers(questionId, size, page));
    }

    @Operation(summary = "답변 공개 범위 변경")
    @PatchMapping("/answer/{answer_id}")
    public ResponseEntity updateAccessLevel(@PathVariable("answer_id") long answerId,
                                            @RequestParam(value = "access_level") String accessLevel) {
        answerService.updateAccessLevel(answerId, accessLevel);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "최신 답변에 대한 질문 조회")
    @GetMapping("/lastest_question")
    public ResponseEntity<List<AnswerQuestionResponse>> getLastestQuestion(
            @RequestParam(value = "is_solved", defaultValue = "true") boolean isSolved) {
        return ResponseEntity.ok().body(answerService.getLastestQuestion(isSolved));
    }

    @Operation(summary = "음성 답변 텍스트로 변환")
    @PostMapping(value = "/speech/text", consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<TextAnswerResponse> convertSpeechToText(@RequestBody byte[] speech) {
        return ResponseEntity.ok().body(answerService.convertSpeechToText(speech));
    }
}
