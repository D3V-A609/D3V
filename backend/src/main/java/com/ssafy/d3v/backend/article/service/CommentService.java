package com.ssafy.d3v.backend.article.service;

import com.ssafy.d3v.backend.article.dto.CommentRequest;
import com.ssafy.d3v.backend.article.dto.CommentResponse;
import com.ssafy.d3v.backend.common.dto.PagedResponse;
import java.util.List;

public interface CommentService {
    PagedResponse<CommentResponse> get(Long articleId, int page, int size);

    CommentResponse create(Long articleId, CommentRequest commentRequest);

    CommentResponse update(Long articleId, Long commentId, CommentRequest commentRequest);

    void delete(Long articleId, Long commentId);

    List<CommentResponse> getMyComments(Long memberId);
}
