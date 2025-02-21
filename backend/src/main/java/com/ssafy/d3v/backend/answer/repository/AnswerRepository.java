package com.ssafy.d3v.backend.answer.repository;

import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.question.entity.Question;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long>, QuerydslPredicateExecutor<Answer> {
    boolean existsByQuestionAndMember(Question question, Member member);

    List<Answer> findByQuestionAndMember(Question question, Member member);

    // 특정 questionId에 대한 답변 개수 조회
    @Query("SELECT COUNT(a) FROM Answer a WHERE a.question.id = :questionId")
    long countAnswersByQuestionId(@Param("questionId") Long questionId);

    // 특정 questionId에 대해 답변을 작성한 멤버 수 조회 (중복 제거)
    @Query("SELECT COUNT(DISTINCT a.member.id) FROM Answer a WHERE a.question.id = :questionId")
    long countDistinctMembersByQuestionId(@Param("questionId") Long questionId);
}