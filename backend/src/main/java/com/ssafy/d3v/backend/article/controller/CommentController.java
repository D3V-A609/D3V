package com.ssafy.d3v.backend.article.controller;

import com.ssafy.d3v.backend.article.dto.CommentRequest;
import com.ssafy.d3v.backend.article.dto.CommentResponse;
import com.ssafy.d3v.backend.article.service.CommentService;
import com.ssafy.d3v.backend.common.dto.PagedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/article")
@Tag(name = "댓글", description = "댓글 API")
public class CommentController {
    private final CommentService commentService;

    @Operation(summary = "댓글 조회")
    @GetMapping("/{article_id}/comment")
    public ResponseEntity<PagedResponse<CommentResponse>> get(@PathVariable("article_id") long articleId,
                                                              @RequestParam(value = "page", defaultValue = "1") int page,
                                                              @RequestParam(value = "size", defaultValue = "15") int size) {
        return ResponseEntity.ok().body(commentService.get(articleId, page, size));
    }

}