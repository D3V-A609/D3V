package com.ssafy.d3v.backend.question.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@ToString
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
    private String content;

    @NotBlank
    @Column(name = "standard_answer")
    private String standardAnswer;

    @ColumnDefault("0")// 기본값 = 0
    private Long answerCount;

    @ColumnDefault("0")// 기본값 = 0
    private Long challengeCount;

    @Builder
    public Question(String content, String standardAnswer) {
        this.content = content;
        this.standardAnswer = standardAnswer;
    }
}
