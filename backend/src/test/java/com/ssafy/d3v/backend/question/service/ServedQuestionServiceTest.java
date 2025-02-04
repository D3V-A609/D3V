package com.ssafy.d3v.backend.question.service;


import static org.assertj.core.api.Assertions.*;
import com.ssafy.d3v.backend.question.entity.Question;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.context.jdbc.SqlGroup;

@SpringBootTest
@TestPropertySource("classpath:test-application.properties")
@Sql(value = "/sql/servedquestion-service-test-data.sql", executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
public class ServedQuestionServiceTest {


}
