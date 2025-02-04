package com.ssafy.d3v.backend.question.repository;

import static com.ssafy.d3v.backend.question.entity.QServedQuestion.servedQuestion;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.question.entity.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ServedQuestionCustomRepository {
    private final JPAQueryFactory queryFactory;

    public int updateIsSolvedByQuestionAndMember(Question question, Member member, boolean isSolved) {
        long affectedRows = queryFactory.update(servedQuestion)
                .set(servedQuestion.isSolved, isSolved)
                .where(servedQuestion.question.eq(question)
                        .and(servedQuestion.member.eq(member)))
                .execute();

        return (int) affectedRows;
    }
}
