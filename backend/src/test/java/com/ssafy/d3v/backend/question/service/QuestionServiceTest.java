package com.ssafy.d3v.backend.question.service;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.ssafy.d3v.backend.question.entity.Question;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.context.jdbc.SqlGroup;

@SpringBootTest
@TestPropertySource("classpath:test-application.properties")
@SqlGroup({
        @Sql(value = "/sql/question-service-test-data.sql", executionPhase = ExecutionPhase.BEFORE_TEST_METHOD),
        //@Sql(value = "/sql/delete-all-data.sql", executionPhase = ExecutionPhase.AFTER_TEST_METHOD)
})
public class QuestionServiceTest {

    @Autowired
    private QuestionService questionService;
    @Test
    public void getById는_존재하는_질문을_반환한다() {
        //given
        //when
        Question result = questionService.getById(1);
        //then
        assertThat(result.getContent()).isEqualTo("Question 1");
        assertThat(result.getStandardAnswer()).isEqualTo("Standard answer for question 1");
    }
}
