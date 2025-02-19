package com.ssafy.d3v.backend.question.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.d3v.backend.bookmark.entity.BookmarkQuestion;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@DynamicInsert // null 값을 가진 필드를 INSERT 쿼리에서 제외하여 데이터베이스의 기본값을 넣을 수 있음
public class Question {
    @Id
    @Column(name = "question_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String content;

    @NotBlank
    @Column(name = "standard_answer", columnDefinition = "TEXT")
    private String standardAnswer;

    @ColumnDefault("0")// 기본값 = 0
    private Long answerCount;

    @ColumnDefault("0")// 기본값 = 0
    private Long challengeCount;

    @ColumnDefault("0.0")
    private Double answerAverage;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<QuestionJob> questionJobs;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<QuestionSkill> questionSkills;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<BookmarkQuestion> bookmarkQuestions;

    @Builder
    public Question(String content, String standardAnswer) {
        this.content = content;
        this.standardAnswer = standardAnswer;
    }

    @Builder
    public Question(Long id, String content, String standardAnswer, Long answerCount, Long challengeCount) {
        this.id = id;
        this.content = content;
        this.standardAnswer = standardAnswer;
        this.answerCount = answerCount;
        this.challengeCount = challengeCount;
    }

    public void updateQuestion(Long answerCount, Long challengeCount) {
        this.answerCount = answerCount;
        this.challengeCount = challengeCount;
        if (challengeCount != null && challengeCount != 0) {
            this.answerAverage = (double) answerCount / challengeCount;
        } else {
            this.answerAverage = 0.0; // challengeCount가 0이거나 null인 경우 0.0으로 설정
        }
    }
}
