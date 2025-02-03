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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/answer")
@Tag(name = "좋아요", description = "좋아요 관련 API")
public class LikesController {
    private final LikesService likesService;

    @PostMapping("/{answer_id}/like")
    @Operation(summary = "좋아요", description = "답변에 대한 좋아요를 추가합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "성공적으로 좋아요 추가",
                    content = @Content(schema = @Schema(implementation = Question.class))),
            @ApiResponse(responseCode = "404", description = "사용자나 질문을 찾을 수 없음")
    })
    public ResponseEntity create(@PathVariable("answer_id") int answerId, LikesRequest request) {
        likesService.create(answerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{answer_id}/like")
    @Operation(summary = "좋아요 취소", description = "좋아요를 취소합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "성공적으로 좋아요 취소",
                    content = @Content(schema = @Schema(implementation = Question.class))),
            @ApiResponse(responseCode = "404", description = "좋아요를 찾을 수 없음")
    })
    public ResponseEntity delete(@PathVariable("answer_id") int answerId) {
        likesService.delete(answerId);
        return ResponseEntity.ok().build();
    }
}
