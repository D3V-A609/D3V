package com.ssafy.d3v.backend.question.controller;

import com.ssafy.d3v.backend.question.controller.dto.ServedQuestionCreate;
import com.ssafy.d3v.backend.question.controller.dto.ServedQuestionUpdate;
import com.ssafy.d3v.backend.question.service.ServedQuestionService;
import com.ssafy.d3v.backend.question.service.dto.ServedQuestionDto;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/api/servedquestion")
@RequiredArgsConstructor
public class ServedQuestionController {

    private final ServedQuestionService servedQuestionService;

    @GetMapping
    public ResponseEntity<List<ServedQuestionDto>> getAllServedQuestions() {
        return ResponseEntity.ok(servedQuestionService.getAllServedQuestions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServedQuestionDto> getServedQuestion(@PathVariable Long id) {
        return ResponseEntity.ok(servedQuestionService.getServedQuestion(id));
    }

    @PostMapping
    public ResponseEntity<ServedQuestionDto> createServedQuestion(@RequestBody ServedQuestionCreate servedQuestionCreate) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servedQuestionService.createServedQuestion(servedQuestionCreate, false));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ServedQuestionDto> updateServedQuestion(
            @PathVariable Long id,
            @RequestBody ServedQuestionUpdate servedQuestionUpdate) {
        return ResponseEntity.ok(servedQuestionService.updateServedQuestion(id, servedQuestionUpdate));
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<ServedQuestionDto>> getServedQuestionsByMember(@PathVariable Long memberId) {
        List<ServedQuestionDto> servedQuestions = servedQuestionService.getServedQuestionsByMemberId(memberId);
        return ResponseEntity.ok(servedQuestions);
    }
}
