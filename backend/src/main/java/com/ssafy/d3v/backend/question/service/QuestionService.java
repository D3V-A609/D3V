package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.exception.QuestionNotFoundException;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Builder
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public Question getById(Integer questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new QuestionNotFoundException("Question not found with id: " + questionId));
    }
}
