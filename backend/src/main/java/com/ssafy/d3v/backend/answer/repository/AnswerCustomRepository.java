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

    public List<Answer> findPublicAnswersByQuestion(Question question) {
        return queryFactory
                .selectFrom(answer)
                .where(answer.question.eq(question)
                        .and(answer.accessLevel.stringValue().eq(AccessLevel.PUBLIC.toString())))
                .fetch();
    }
}
