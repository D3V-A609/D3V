package com.ssafy.d3v.backend.feedback.controller;

import com.ssafy.d3v.backend.feedback.dto.FeedbackRequest;
import com.ssafy.d3v.backend.feedback.dto.FeedbackResponse;
import com.ssafy.d3v.backend.feedback.service.FeedbackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/answer")
@Tag(name = "피드백", description = "피드백 API")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @Operation(summary = "피드백 조회")
    @GetMapping("/{answer_id}/feedback")
    public ResponseEntity<List<FeedbackResponse>> get(@PathVariable("answer_id") long answerId) {
        return ResponseEntity.ok().body(feedbackService.get(answerId));
    }

    @Operation(summary = "피드백 생성")
    @PostMapping("/{answer_id}/feedback")
    public ResponseEntity<FeedbackResponse> create(@PathVariable("answer_id") long answerId,
                                                   @RequestBody FeedbackRequest feedbackRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.create(answerId, feedbackRequest));
    }
}
