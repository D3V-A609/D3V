package com.ssafy.d3v.backend.answer.repository;

import static com.ssafy.d3v.backend.answer.entity.QAnswer.answer;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.question.entity.Question;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AnswerCustomRepository {
    private final JPAQueryFactory queryFactory;

    public List<Answer> findPublicAnswersByQuestion(Question question, int size, int page) {
        return queryFactory
                .selectFrom(answer)
                .where(answer.question.eq(question)
                        .and(answer.accessLevel.stringValue().eq(AccessLevel.PUBLIC.toString())))
                .orderBy(answer.createdAt.desc())
                .offset((long) (page - 1) * size)
                .limit(size)
                .fetch();
    }
    public long countPublicAnswersByQuestion(Question question) {
        return queryFactory
                .select(answer.count())
                .from(answer)
                .where(answer.question.eq(question)
                        .and(answer.accessLevel.stringValue().eq(AccessLevel.PUBLIC.toString())))
                .fetchOne();
    }
}
