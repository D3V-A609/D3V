package com.ssafy.d3v.backend.like.controller;

import com.ssafy.d3v.backend.like.dto.LikesRequest;
import com.ssafy.d3v.backend.like.service.LikesService;
import com.ssafy.d3v.backend.question.entity.Question;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/answer")
@Tag(name = "좋아요", description = "좋아요 관련 API")
public class LikesController {
    private final LikesService likesService;

    @PostMapping("/{answer_id}/like")
    public ResponseEntity create(@PathVariable("answer_id") int answerId, @RequestBody LikesRequest request) {
        likesService.create(answerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{answer_id}/like")
    public ResponseEntity delete(@PathVariable("answer_id") int answerId) {
        likesService.delete(answerId);
        return ResponseEntity.ok().build();
    }
}
