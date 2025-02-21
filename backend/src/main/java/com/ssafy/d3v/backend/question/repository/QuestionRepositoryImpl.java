package com.ssafy.d3v.backend.question.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.d3v.backend.answer.entity.QAnswer;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.QJob;
import com.ssafy.d3v.backend.question.entity.QQuestion;
import com.ssafy.d3v.backend.question.entity.QQuestionJob;
import com.ssafy.d3v.backend.question.entity.QQuestionSkill;
import com.ssafy.d3v.backend.question.entity.QServedQuestion;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.SkillType;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class QuestionRepositoryImpl implements QuestionCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Question> findTop10QuestionsByAnswerCount(LocalDateTime startDate, LocalDateTime endDate,
                                                          JobRole jobRole) {
        QQuestion question = QQuestion.question;
        QAnswer answer = QAnswer.answer;
        QQuestionJob questionJob = QQuestionJob.questionJob;
        QJob job = QJob.job;

        return queryFactory.selectFrom(question)
                .leftJoin(questionJob).on(questionJob.question.eq(question)) // Join with QuestionJob entity
                .leftJoin(job).on(questionJob.job.eq(job)) // Join with Job entity through QuestionJob
                .leftJoin(answer).on(answer.question.eq(question)) // Join with Answer entity
                .where(
                        job.jobRole.eq(jobRole) // Filter by JobRole
                                .and(
                                        answer.createdAt.isNull() // Include questions without answers
                                                .or(answer.createdAt.between(startDate, endDate))
                                        // Or filter by date range
                                )
                )
                .groupBy(question.id)
                .orderBy(answer.count().coalesce(0L).desc()) // Handle null counts by using coalesce to default to 0
                .limit(10)
                .fetch();
    }

    public Page<Question> searchQuestions(
            List<JobRole> jobRoles,
            List<SkillType> skillTypes,
            Member member,
            String solvedFilter,
            String order,
            String sort,
            int page,
            int size,
            String keyword) {

        QQuestion question = QQuestion.question;
        QQuestionJob questionJob = QQuestionJob.questionJob;
        QQuestionSkill questionSkill = QQuestionSkill.questionSkill;
        QServedQuestion servedQuestion = QServedQuestion.servedQuestion;

        // 동적 조건 생성
        List<BooleanExpression> predicates = Stream.of(
                // 직무 필터링
                Optional.ofNullable(jobRoles)
                        .filter(j -> !j.isEmpty())
                        .map(j -> questionJob.job.jobRole.in(j))
                        .orElse(null),

                // 기술 필터링
                Optional.ofNullable(skillTypes)
                        .filter(s -> !s.isEmpty())
                        .map(s -> questionSkill.skill.name.in(s))
                        .orElse(null),

                // solved 필터링
                Optional.ofNullable(solvedFilter)
                        .map(filter -> {
                            if ("solved".equals(filter)) {
                                return servedQuestion.member.id.eq(member.getId())
                                        .and(servedQuestion.isSolved.isTrue());
                            } else if ("unSolved".equals(filter)) {
                                return servedQuestion.member.id.eq(member.getId())
                                        .and(servedQuestion.isSolved.isFalse());
                            } else if ("notSolved".equals(filter)) {
                                return servedQuestion.isNull();
                            }
                            return null;
                        })
                        .orElse(null),

                // 검색어 제목 필터링
                Optional.ofNullable(keyword)
                        .filter(k -> !k.isEmpty())
                        .map(k -> question.content.containsIgnoreCase(k))
                        .orElse(null)
        ).filter(Objects::nonNull).toList();

        // 정렬 기준 매핑
        Map<String, Function<Boolean, OrderSpecifier<?>>> sortMapping = Map.of(
                "acnt", asc -> asc ? question.answerCount.asc() : question.answerCount.desc(),
                "ccnt", asc -> asc ? question.challengeCount.asc() : question.challengeCount.desc(),
                "avg", asc -> asc ? question.answerAverage.asc() : question.answerAverage.desc()
        );

        // 선택된 기준과 나머지 기준의 정렬 처리
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();

        // 선택된 정렬 기준 추가
        Optional.ofNullable(sort)
                .map(sortMapping::get)
                .map(func -> func.apply("asc".equalsIgnoreCase(order)))
                .ifPresent(orderSpecifiers::add);

        // 선택되지 않은 나머지 정렬 기준은 고정된 우선순위로 desc 추가
        List<String> sortPriority = List.of("acnt", "ccnt", "avg");
        sortPriority.stream()
                .filter(key -> !key.equals(sort)) // 선택된 기준 제외
                .forEach(key -> orderSpecifiers.add(sortMapping.get(key).apply(false))); // desc로 정렬

        Pageable pageable = PageRequest.of(page, size);

        // 쿼리 생성
        log.info("질문 필터링 쿼리=========================");
        JPAQuery<Question> query = queryFactory.selectFrom(question)
                .distinct()
                .leftJoin(servedQuestion).on(servedQuestion.question.id.eq(question.id))
                .leftJoin(question.questionJobs, questionJob)
                .leftJoin(question.questionSkills, questionSkill)
                .where(predicates.toArray(new BooleanExpression[0]));

        long total = query.fetch().size();

        // 페이징 및 정렬 처리
        log.info("질문 페이징 쿼리=========================");
        List<Question> results = query
                .orderBy(orderSpecifiers.toArray(new OrderSpecifier[0])) // 다중 정렬 적용
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results, pageable, total);
    }


}
