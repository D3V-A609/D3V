package com.ssafy.d3v.backend.question.repository;

import static com.ssafy.d3v.backend.question.entity.QServedQuestion.servedQuestion;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.ServedQuestion;
import java.util.List;
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

    public List<ServedQuestion> findServedQuestions(Long memberId, Boolean isSolved) {
        BooleanBuilder whereClause = new BooleanBuilder();

        whereClause.and(servedQuestion.member.id.eq(memberId));

        if (isSolved != null) {
            whereClause.and(servedQuestion.isSolved.eq(isSolved));
        }

        return queryFactory
                .selectFrom(servedQuestion)
                .where(whereClause)
                .orderBy(servedQuestion.servedAt.desc())
                .fetch();
    }
}
