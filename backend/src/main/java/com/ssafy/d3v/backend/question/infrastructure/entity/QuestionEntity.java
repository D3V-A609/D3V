package com.ssafy.d3v.backend.question.infrastructure.entity;

import com.ssafy.d3v.backend.question.domain.Question;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Table(name = "questions")
public class QuestionEntity {
    @Id
    @Column(name = "question_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int questionId;

    @NotBlank
    private String content;

    @NotBlank
    private String standardAnswer;

    public static QuestionEntity from(Question question) {
        QuestionEntity questionEntity = new QuestionEntity();
        questionEntity.questionId = question.getQuestionId();
        questionEntity.content = question.getContent();
        questionEntity.standardAnswer = question.getStandardAnswer();
        return questionEntity;
    }
    public Question toModel(){
        return Question.builder()
                .questionId(questionId)
                .content(content)
                .standardAnswer(standardAnswer)
                .build();

    }
}
