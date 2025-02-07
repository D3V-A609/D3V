package com.ssafy.d3v.backend.question.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.d3v.backend.answer.entity.QAnswer;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.QJob;
import com.ssafy.d3v.backend.question.entity.QQuestion;
import com.ssafy.d3v.backend.question.entity.QQuestionJob;
import com.ssafy.d3v.backend.question.entity.Question;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
}
