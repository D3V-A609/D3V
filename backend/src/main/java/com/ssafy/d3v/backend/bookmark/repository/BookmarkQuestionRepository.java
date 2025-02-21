package com.ssafy.d3v.backend.bookmark.repository;

import com.ssafy.d3v.backend.bookmark.entity.BookmarkQuestion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkQuestionRepository extends JpaRepository<BookmarkQuestion, Long> {

    @Query("SELECT bq.bookmark.id FROM BookmarkQuestion bq " +
            "WHERE bq.question.id = :questionId " +
            "AND bq.bookmark.member.id = :memberId")
    List<Long> findBookmarkIdsByQuestionIdAndMemberId(@Param("questionId") Long questionId,
                                                      @Param("memberId") Long memberId);
    

    @Query(value = "INSERT INTO bookmark_question (bookmark_id, question_id) VALUES (:bookmarkId, :questionId) ON CONFLICT (bookmark_id, question_id) DO NOTHING", nativeQuery = true)
    @Modifying
    void upsertBookmarkQuestion(@Param("bookmarkId") Long bookmarkId, @Param("questionId") Long questionId);


    @Query("SELECT bq.bookmark.id FROM BookmarkQuestion bq " +
            "WHERE bq.question.id = :questionId")
    List<Long> findBookmarkIdsByQuestionId(@Param("questionId") Long questionId);

    @Modifying
    @Query("DELETE FROM BookmarkQuestion bq " +
            "WHERE bq.question.id = :questionId " +
            "AND bq.bookmark.id IN :bookmarkIds")
    void deleteByQuestionIdAndBookmarkIds(@Param("questionId") Long questionId,
                                          @Param("bookmarkIds") List<Long> bookmarkIds);

    @Query("SELECT COUNT(bq) > 0 FROM BookmarkQuestion bq " +
            "JOIN bq.bookmark b " +
            "WHERE bq.question.id = :questionId " +
            "AND b.member.id = :memberId")
    boolean existsByQuestionIdAndMemberId(@Param("questionId") Long questionId, @Param("memberId") Long memberId);

    void deleteByBookmarkIdAndQuestionId(Long bookmarkId, Long questionId);
}
