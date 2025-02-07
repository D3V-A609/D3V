package com.ssafy.d3v.backend.question.repository;

import com.ssafy.d3v.backend.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long>, QuestionCustomRepository {

}
