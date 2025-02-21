package com.ssafy.d3v.backend.question.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuestionScheduler {

    private final QuestionService questionService;

    /**
     * 매월 1일 오전 2시에 실행하여 모든 직무의 Top 10 질문 생성 및 저장.
     */
    @Scheduled(cron = "0 0 2 1 * ?") // 매월 1일 오전 2시 실행
    public void scheduleMonthlyTop10Questions() {
        String previousMonth = LocalDate.now().minusMonths(1).format(DateTimeFormatter.ofPattern("yyyy-MM"));
        questionService.generateAndSaveTop10QuestionsForAllJobs(previousMonth);
    }

//    /**
//     * 하루에 한 번 실행: 매일 2AM 실행
//     */
//    @Scheduled(cron = "0 0 2 * * ?") // 매일 오전 2시 실행
//    public void scheduleDailyQuestions() {
//        // getDailyQuestions 호출
//        List<QuestionDto> dailyQuestions = questionService.getDailyQuestions();
//
//        // 로그 출력 (필요 시 추가 로직 작성 가능)
//        System.out.println("Daily Questions executed for date: " + LocalDate.now());
//        dailyQuestions.forEach(question -> System.out.println(question.content()));
//    }
}
