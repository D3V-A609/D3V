package com.ssafy.d3v.backend.question.infrastructure;

import com.ssafy.d3v.backend.question.application.port.QuestionRepository;
import com.ssafy.d3v.backend.question.domain.Question;
import com.ssafy.d3v.backend.question.infrastructure.entity.QuestionEntity;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class QuestionRepositoryImpl implements QuestionRepository {

    private final QuestionJpaRepository questionJpaRepository;
    @Override
    public Optional<Question> findById(int questionId) {
        return questionJpaRepository.findById(questionId).map(QuestionEntity::toModel);
    }
}
