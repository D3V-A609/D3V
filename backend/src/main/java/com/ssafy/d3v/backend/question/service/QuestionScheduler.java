package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.question.entity.Question;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuestionScheduler {

    private final QuestionService questionService;

    /**
     * 한 달에 한 번 실행: 매월 1일 2AM 실행
     */
    @Scheduled(cron = "0 0 2 1 * ?") // 매월 1일 오전 2시 실행
    public void scheduleMonthlyTop10Questions() {
        // 현재 날짜를 기준으로 이전 달의 데이터를 가져옴
        LocalDate now = LocalDate.now();
        String Month = now.format(DateTimeFormatter.ofPattern("yyyy-MM"));

        // 예시 직무 (필요 시 수정 가능)
        String jobRoleString = "DEVELOPER";

        // getTop10Questions 호출
        List<Question> top10Questions = questionService.getTop10Questions(Month, jobRoleString);

        // 로그 출력 (필요 시 추가 로직 작성 가능)
        System.out.println("Monthly Top 10 Questions executed for month: " + Month);
        top10Questions.forEach(question -> System.out.println(question.getContent()));
    }

    /**
     * 하루에 한 번 실행: 매일 2AM 실행
     */
    @Scheduled(cron = "0 0 2 * * ?") // 매일 오전 2시 실행
    public void scheduleDailyQuestions() {
        // getDailyQuestions 호출
        List<Question> dailyQuestions = questionService.getDailyQuestions();

        // 로그 출력 (필요 시 추가 로직 작성 가능)
        System.out.println("Daily Questions executed for date: " + LocalDate.now());
        dailyQuestions.forEach(question -> System.out.println(question.getContent()));
    }
}
