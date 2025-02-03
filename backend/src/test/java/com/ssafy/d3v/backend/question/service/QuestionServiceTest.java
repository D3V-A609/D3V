package com.ssafy.d3v.backend.question.service;


import static org.assertj.core.api.Assertions.*;

import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
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
@Sql(value = "/sql/question-service-test-data.sql", executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
public class QuestionServiceTest {

    @Autowired
    private QuestionService questionService;

//    @Test
//    public void getById는_존재하는_질문을_반환한다() {
//        // when
//        Question result = questionService.getById(1L);
//
//        // then
//        assertThat(result.getContent()).isEqualTo("Question 1");
//        assertThat(result.getStandardAnswer()).isEqualTo("Standard answer for question 1");
//    }
}
