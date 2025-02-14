package com.ssafy.d3v.backend.bookmark.service;

import com.ssafy.d3v.backend.bookmark.dto.BookmarkCreateDto;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkDetailResponse;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkResponse;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkSelectionResponse;
import java.util.List;

public interface BookmarkService {

    void create(BookmarkCreateDto request);

    void update(Long id, BookmarkCreateDto request);

    void delete(Long id);

    BookmarkDetailResponse get(Long id);

    BookmarkResponse getAll(Long userId);

    BookmarkSelectionResponse getQuestionBookmarks(Long questionId);

    BookmarkSelectionResponse updateQuestionBookmarks(Long questionId, List<Long> bookmarkIds);

    void addQuestions(Long bookmarkId, List<Long> questionIds);

    void deleteQuestion(Long bookmarkId, Long questionId);

}
