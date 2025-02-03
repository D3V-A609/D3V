package com.ssafy.d3v.backend.bookmark.repository;


import com.ssafy.d3v.backend.bookmark.entity.Bookmark;
import com.ssafy.d3v.backend.bookmark.entity.BookmarkQuestion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkQuestionRepository extends JpaRepository<BookmarkQuestion, Long> {
    // 특정 북마크에 연관된 모든 질문들 조회
    List<BookmarkQuestion> findByBookmark(Bookmark bookmark);
}
