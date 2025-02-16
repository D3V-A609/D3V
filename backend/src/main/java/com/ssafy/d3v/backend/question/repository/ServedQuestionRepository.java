package com.ssafy.d3v.backend.question.repository;

import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.question.entity.ServedQuestion;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface ServedQuestionRepository extends JpaRepository<ServedQuestion, Long>,
        QuerydslPredicateExecutor<ServedQuestion> {

    List<ServedQuestion> findByMember(Member member);

    List<ServedQuestion> findByMemberAndServedAtAfter(Member member, LocalDate servedAt);

    List<ServedQuestion> findByMemberAndIsDailyAndServedAt(Member member, Boolean isDaily, LocalDate servedAt);

    Optional<ServedQuestion> findByMemberAndQuestion_Id(Member member, Long questionId);

    @Query("SELECT sq.isSolved " +
            "FROM ServedQuestion sq " +
            "JOIN sq.question q " +
            "WHERE q.id IN :questionIds")
    List<String> findSolvedByQuestionIds(@Param("questionIds") List<Long> questionIds);
}

