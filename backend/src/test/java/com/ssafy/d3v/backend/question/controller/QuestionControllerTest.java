package com.ssafy.d3v.backend.question.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
@SqlGroup({
        @Sql(value= "/sql/question-controller-test-data.sql", executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
})
public class QuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void 사용자는_특정_질문의_상세_정보를_조회할_수_있다() throws Exception {
        // Given
        // When
        // Then
        mockMvc.perform(get("/api/question/{question_id}", 1)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questionId").value(1))
                .andExpect(jsonPath("$.content").value("Question 1"))
                .andExpect(jsonPath("$.standardAnswer").value("Standard answer for question 1"));
    }

    @Test
    public void 사용자는_존재하지_않는_질문의_아이디로_api를_호출할_경우_404_응답을_받는다() throws Exception {
        // Given
        // When
        // Then
        mockMvc.perform(get("/api/question/{question_id}", 2000)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
