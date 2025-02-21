package com.ssafy.d3v.backend.answer.repository;

import static com.ssafy.d3v.backend.answer.entity.QAnswer.answer;
import static com.ssafy.d3v.backend.like.entity.QLikes.likes;
import static com.ssafy.d3v.backend.member.entity.QFollow.follow;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.common.util.AccessLevel;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.entity.QMember;
import com.ssafy.d3v.backend.question.entity.Question;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AnswerCustomRepository {
    private final JPAQueryFactory queryFactory;

    public List<Answer> findAnswersByAccessLevel(Question question, Member viewer, int size, int page) {
        return queryFactory
                .selectFrom(answer)
                .where(
                        answer.question.eq(question),
                        answer.member.isNotNull(),
                        getAccessCondition(viewer)
                )
                .orderBy(answer.createdAt.desc())
                .offset((long) (page - 1) * size)
                .limit(size)
                .fetch();
    }

    public long countAnswersByAccessLevel(Question question, Member viewer) {
        return queryFactory
                .select(answer.count())
                .from(answer)
                .where(
                        answer.question.eq(question),
                        getAccessCondition(viewer)
                )
                .fetchOne();
    }

    private BooleanExpression getAccessCondition(Member viewer) {
        return answer.accessLevel.eq(AccessLevel.PUBLIC)
                .or(answer.member.eq(viewer))
                .or(answer.accessLevel.eq(AccessLevel.PROTECTED).and(isFollower(viewer, answer.member)));
    }

    private BooleanExpression isFollower(Member viewer, QMember owner) {
        return queryFactory
                .selectOne()
                .from(follow)
                .where(follow.follower.eq(viewer), follow.following.eq(owner))
                .exists();
    }

    public List<Answer> getAnswerByLike(Member member) {
        return queryFactory
                .select(likes.answer)
                .from(likes)
                .where(likes.member.eq(member))
                .orderBy(likes.answer.createdAt.desc())
                .fetch();
    }
}
