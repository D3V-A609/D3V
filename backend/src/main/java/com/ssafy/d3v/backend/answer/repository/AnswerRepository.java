package com.ssafy.d3v.backend.answer.repository;

import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.question.entity.Question;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long>, QuerydslPredicateExecutor<Answer> {
    boolean existsByQuestionAndMember(Question question, Member member);

    List<Answer> findByQuestionAndMember(Question question, Member member);
}