package com.ssafy.d3v.backend.question.repository;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.d3v.backend.answer.entity.QAnswer;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.question.dto.QuestionDto;
import com.ssafy.d3v.backend.question.dto.QuestionResponse;
import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.QJob;
import com.ssafy.d3v.backend.question.entity.QQuestion;
import com.ssafy.d3v.backend.question.entity.QQuestionJob;
import com.ssafy.d3v.backend.question.entity.QQuestionSkill;
import com.ssafy.d3v.backend.question.entity.QSkill;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.QuestionJob;
import com.ssafy.d3v.backend.question.entity.QuestionSkill;
import com.ssafy.d3v.backend.question.entity.ServedQuestion;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.entity.SkillType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class QuestionRepositoryImpl implements QuestionCustomRepository {

    private final JPAQueryFactory queryFactory;
    private final ServedQuestionRepository servedQuestionRepository; // solved 값을 가져오기 위한 Repository

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

    @Override
    public Page<QuestionResponse> searchQuestions(
            List<JobRole> jobRoles,
            List<SkillType> skillTypes,
            Member member, // solved 값을 계산하기 위한 Member 객체
            String solvedFilter, // solved 필터링 값
            String order,
            String sort,
            int page,
            int size,
            String keyword) {

        QQuestion question = QQuestion.question;
        QQuestionJob questionJob = QQuestionJob.questionJob;
        QJob job = QJob.job;
        QQuestionSkill questionSkill = QQuestionSkill.questionSkill;
        QSkill skill = QSkill.skill;

        // 동적 조건 생성
        List<BooleanExpression> predicates = Stream.of(
                // jobs 필터링
                Optional.ofNullable(jobRoles)
                        .filter(j -> !j.isEmpty())
                        .map(j -> questionJob.job.jobRole.in(j))
                        .orElse(null),

                // skills 필터링
                Optional.ofNullable(skillTypes)
                        .filter(s -> !s.isEmpty())
                        .map(s -> questionSkill.skill.name.in(s))
                        .orElse(null),

                // keyword 제목 검색
                Optional.ofNullable(keyword)
                        .filter(k -> !k.isEmpty())
                        .map(k -> question.content.containsIgnoreCase(k))
                        .orElse(null)
        ).filter(Objects::nonNull).toList();

        // 정렬 기준 매핑
        Map<String, Function<Boolean, OrderSpecifier<?>>> sortMapping = Map.of(
                "acnt", asc -> asc ? question.answerCount.asc() : question.answerCount.desc(),
                "ccnt", asc -> asc ? question.challengeCount.asc() : question.challengeCount.desc(),
                "avg", asc -> {
                    // CaseBuilder를 사용하여 조건부 표현식 생성
                    Expression<Double> avgExpression = new CaseBuilder()
                            .when(question.challengeCount.eq(0L))
                            .then(Expressions.constant(0.0)) // challengeCount가 0이면 0.0 반환
                            .otherwise(
                                    question.answerCount.castToNum(Double.class)
                                            .divide(question.challengeCount.castToNum(Double.class))
                            );

                    // OrderSpecifier 생성
                    return new OrderSpecifier<>(asc ? Order.ASC : Order.DESC, avgExpression);
                }
        );
        // 정렬 기준 선택
        OrderSpecifier<?> orderSpecifier = Optional.ofNullable(sort)
                .map(sortMapping::get)
                .map(func -> func.apply("asc".equalsIgnoreCase(order)))
                .orElseThrow(() -> new IllegalArgumentException("Invalid sort field: " + sort));

        // 페이징 설정
        Pageable pageable = PageRequest.of(page, size);

        // 첫 번째 쿼리: Question만 페치
        JPAQuery<Question> query = queryFactory.selectFrom(question)
                .where(predicates.toArray(new BooleanExpression[0]))
                .orderBy(orderSpecifier);

        long total = query.fetchCount(); // 전체 데이터 수 조회
        List<Question> results = query.offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // N+1 문제 해결: QuestionJobs와 QuestionSkills를 별도로 가져옴
        Map<Long, List<Job>> jobMap = queryFactory.selectFrom(questionJob)
                .leftJoin(questionJob.job, job)
                .where(questionJob.question.in(results))
                .fetch()
                .stream()
                .collect(Collectors.groupingBy(
                        qj -> qj.getQuestion().getId(),
                        Collectors.mapping(QuestionJob::getJob, Collectors.toList())
                ));

        Map<Long, List<Skill>> skillMap = queryFactory.selectFrom(questionSkill)
                .leftJoin(questionSkill.skill, skill)
                .where(questionSkill.question.in(results))
                .fetch()
                .stream()
                .collect(Collectors.groupingBy(
                        qs -> qs.getQuestion().getId(),
                        Collectors.mapping(QuestionSkill::getSkill, Collectors.toList())
                ));

        // 추가 데이터 처리 및 매핑: solved 값과 관련 데이터를 포함한 QuestionResponse 생성
        List<QuestionResponse> responseList = results.stream()
                .map(q -> {
                    String solved = servedQuestionRepository.findByMemberAndQuestion_Id(member, q.getId())
                            .map(ServedQuestion::getIsSolved)
                            .map(isSolved -> isSolved ? "solved" : "unSolved")
                            .orElse("notSolved");

                    List<Job> jobs = jobMap.getOrDefault(q.getId(), List.of());
                    List<Skill> skills = skillMap.getOrDefault(q.getId(), List.of());

                    return QuestionResponse.from(QuestionDto.from(q), solved, skills, jobs);
                })
                // solved 필터링 적용 (필터링 값이 null이면 모든 결과 포함)
                .filter(response -> solvedFilter == null || response.status().equals(solvedFilter))
                .toList();

        return new PageImpl<>(responseList, pageable, total);
    }

}
