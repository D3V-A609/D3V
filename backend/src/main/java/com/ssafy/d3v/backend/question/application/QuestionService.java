package com.ssafy.d3v.backend.question.application;

import com.ssafy.d3v.backend.question.application.port.QuestionRepository;
import com.ssafy.d3v.backend.question.domain.Question;
import com.ssafy.d3v.backend.question.exception.QuestionNotFoundException;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
