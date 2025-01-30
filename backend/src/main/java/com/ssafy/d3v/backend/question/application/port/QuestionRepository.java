package com.ssafy.d3v.backend.question.application.port;

import com.ssafy.d3v.backend.question.domain.Question;
import java.util.Optional;

public interface QuestionRepository {
    Optional<Question> findById(Integer questionId);

    Question save(Question question);
}
