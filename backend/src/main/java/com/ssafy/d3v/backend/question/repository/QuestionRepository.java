package com.ssafy.d3v.backend.question.repository;

import com.ssafy.d3v.backend.question.entity.Question;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    Optional<Question> findById(Long questionid); // 생략 가능하지만 이해를 위해 작성, QuestionEntity를 여기서만 사용
}
