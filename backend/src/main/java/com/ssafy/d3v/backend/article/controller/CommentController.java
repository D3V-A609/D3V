package com.ssafy.d3v.backend.article.controller;

import com.ssafy.d3v.backend.article.dto.CommentRequest;
import com.ssafy.d3v.backend.article.dto.CommentResponse;
import com.ssafy.d3v.backend.article.service.CommentService;
import com.ssafy.d3v.backend.common.dto.PagedResponse;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "댓글", description = "댓글 API")
public class CommentController {
    private final CommentService commentService;

    @Operation(summary = "댓글 조회")
    @GetMapping("/article/{article_id}/comment")
    public ResponseEntity<PagedResponse<CommentResponse>> get(@PathVariable("article_id") long articleId,
                                                              @RequestParam(value = "page", defaultValue = "1") int page,
                                                              @RequestParam(value = "size", defaultValue = "15") int size) {
        return ResponseEntity.ok().body(commentService.get(articleId, page, size));
    }

    @Operation(summary = "댓글 생성")
    @PostMapping("/article/{article_id}/comment")
    public ResponseEntity<CommentResponse> create(@PathVariable("article_id") long articleId,
                                                  @RequestBody CommentRequest commentRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.create(articleId, commentRequest));
    }

    @Operation(summary = "댓글 수정")
    @PatchMapping("/article/{article_id}/comment/{comment_id}")
    public ResponseEntity<CommentResponse> update(@PathVariable("article_id") long articleId,
                                                  @PathVariable("comment_id") long commentId,
                                                  @RequestBody CommentRequest commentRequest) {
        return ResponseEntity.ok().body(commentService.update(articleId, commentId, commentRequest));
    }

    @Operation(summary = "댓글 삭제")
    @DeleteMapping("/article/{article_id}/comment/{comment_id}")
    public ResponseEntity<Void> delete(@PathVariable("article_id") long articleId,
                                       @PathVariable("comment_id") long commentId) {
        commentService.delete(articleId, commentId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "내가 작성한 댓글")
    @GetMapping("member/{member_id}/comment")
    public ResponseEntity<List<CommentResponse>> getComment(@PathVariable("member_id") Long memberId) {
        return ResponseEntity.ok().body(commentService.getMyComments(memberId));
    }
}