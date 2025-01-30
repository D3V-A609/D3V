package com.ssafy.d3v.backend.question.application.service;

import com.ssafy.d3v.backend.question.application.port.QuestionRepository;
import com.ssafy.d3v.backend.question.domain.Question;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Builder
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public Optional<Question> getQuestionById(int questionId) {
        return questionRepository.findById(questionId);
    }
}
