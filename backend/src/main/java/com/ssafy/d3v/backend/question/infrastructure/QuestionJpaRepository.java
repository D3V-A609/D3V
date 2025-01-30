package com.ssafy.d3v.backend.question.infrastructure;

import com.ssafy.d3v.backend.question.infrastructure.entity.QuestionEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionJpaRepository extends JpaRepository<QuestionEntity, Integer> {

    Optional<QuestionEntity> findById(Integer questionid); // 생략 가능하지만 이해를 위해 작성, QuestionEntity를 여기서만 사용
}
