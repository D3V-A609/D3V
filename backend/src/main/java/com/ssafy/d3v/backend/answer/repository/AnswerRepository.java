package com.ssafy.d3v.backend.answer.repository;

import com.ssafy.d3v.backend.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer>, QuerydslPredicateExecutor<Answer> {

}