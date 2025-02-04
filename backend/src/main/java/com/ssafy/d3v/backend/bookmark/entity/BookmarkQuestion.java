package com.ssafy.d3v.backend.bookmark.entity;

import com.ssafy.d3v.backend.question.entity.Question;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "bookmark_question", uniqueConstraints = {
        // (bookmark id + question id) 쌍 유일성 유지를 위한 제약조건
        @UniqueConstraint(
                name = "uq_bookmark_question",
                columnNames = {"bookmark_id", "question_id"}
        )
})
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookmarkQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmark_question_id")
    private Long id;

    // 북마크(N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookmark_id", nullable = false)
    private Bookmark bookmark;

    // 질문(N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    // 북마크 안에서 질문의 정렬 순서를 저장할 필드
    @Column(name = "sort_order")
    private int sortOrder;

    // 정렬 순서 변경용
    public void updateSortOrder(int newOrder) {
        this.sortOrder = newOrder;
    }
}
