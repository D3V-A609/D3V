package com.ssafy.d3v.backend.question.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Question {
    private final int questionId;
    private final String content;
    private final String standardAnswer;

    @Builder
    public Question(int questionId, String content, String standardAnswer) {
        this.questionId = questionId;
        this.content = content;
        this.standardAnswer = standardAnswer;
    }
}
