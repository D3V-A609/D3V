package com.ssafy.d3v.backend.bookmark.repository;


import com.ssafy.d3v.backend.bookmark.entity.BookmarkQuestion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkQuestionRepository extends JpaRepository<BookmarkQuestion, Integer> {
    // 특정 북마크에 연관된 모든 질문들 조회
    List<BookmarkQuestion> findByBookmark_BookmarkId(Long bookmarkId);
}
