package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.question.domain.Question;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Optional<Question> getQuestionById(int questionId) {
        return questionRepository.findById(questionId);
    }
}
