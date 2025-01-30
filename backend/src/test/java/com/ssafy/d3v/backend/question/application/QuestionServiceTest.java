package com.ssafy.d3v.backend.question.application;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.ssafy.d3v.backend.mock.FakeQuestionRepository;
import com.ssafy.d3v.backend.question.application.port.QuestionRepository;
import com.ssafy.d3v.backend.question.domain.Question;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class QuestionServiceTest {

    private QuestionService questionService;


    @BeforeEach
    void init(){
        FakeQuestionRepository fakeQuestionRepository = new FakeQuestionRepository();
        this.questionService = new QuestionService(fakeQuestionRepository);
        fakeQuestionRepository.save(Question.builder()
                        .questionId(1)
                        .content("testContent")
                        .standardAnswer("testStandardAnswer")
                        .build());
    }
    @Test
    public void getById는_존재하는_질문을_반환한다() {
        //given
        //when
        Question result = questionService.getById(1);
        //then
        assertThat(result.getContent()).isEqualTo("testContent");
        assertThat(result.getStandardAnswer()).isEqualTo("testStandardAnswer");
    }
}
