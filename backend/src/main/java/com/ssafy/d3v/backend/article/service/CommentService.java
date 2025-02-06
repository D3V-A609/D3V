package com.ssafy.d3v.backend.article.service;

import com.ssafy.d3v.backend.article.dto.CommentRequest;
import com.ssafy.d3v.backend.article.dto.CommentResponse;
import com.ssafy.d3v.backend.common.dto.PagedResponse;

public interface CommentService {
    PagedResponse<CommentResponse> get(Long articleId, int page, int size);
    CommentResponse create(Long articleId, CommentRequest commentRequest);
    CommentResponse update(Long articleId, Long commentId, CommentRequest commentRequest);
}
