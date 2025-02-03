package com.ssafy.d3v.backend.like.service;

import com.ssafy.d3v.backend.like.dto.LikesRequest;

public interface LikesService {
    void create(long answerId, LikesRequest request);
    void delete(long answerId);
}
