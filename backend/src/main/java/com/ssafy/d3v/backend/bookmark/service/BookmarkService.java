package com.ssafy.d3v.backend.bookmark.service;

import com.ssafy.d3v.backend.bookmark.dto.BookmarkCreateDto;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkDetailResponse;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkResponse;

public interface BookmarkService {

    void create(BookmarkCreateDto request);

    void update(Long id, BookmarkCreateDto request);

    void delete(Long id);

    BookmarkDetailResponse get(Long id);

    BookmarkResponse getAll(Long userId);

    // 2차 MVP 때 개발
//    BookmarkDetailResponse addQuestion(Long bookmarkId, Long questionId);
//
//    BookmarkDetailResponse deleteQuestion(Long bookmarkId, Long questionId);
//
//    BookmarkDetailResponse updateQuestionOrder(Long bookmarkId, Long questionId, int order);
}
