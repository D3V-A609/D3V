package com.ssafy.d3v.backend.feedback.repository;

import static com.ssafy.d3v.backend.feedback.entity.QFeedback.feedback;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.d3v.backend.answer.entity.Answer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FeedbackCustomRepository {
    private final JPAQueryFactory queryFactory;

    public long countFeedbackByAnswer(Answer answer) {
        return queryFactory
                .select(feedback.count())
                .from(feedback)
                .where(feedback.answer.eq(answer))
                .fetchOne();
    }
}
