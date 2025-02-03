package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.ServedQuestion;
import com.ssafy.d3v.backend.question.exception.QuestionNotFoundException;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import com.ssafy.d3v.backend.question.repository.ServedQuestionRepository;
import com.ssafy.d3v.backend.question.service.dto.QuestionDto;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final ServedQuestionRepository servedQuestionRepository;
    private final MemberRepository memberRepository;
    private final Long TempMemeberId = 1L; // 임시 아이디

    public Question getById(Long questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new QuestionNotFoundException("Question not found with id: " + questionId));
    }

    public List<Question> getDailyQuestions() {
        Long memberId = TempMemeberId; // 임시코드, MemberId를 토큰에서 가져오도록 변경해야함
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with ID: " + memberId));
        // 현재 날짜
        LocalDate today = LocalDate.now();

        // 1. 오늘 제공된 데일리 질문 조회
        List<ServedQuestion> dailyQuestions = servedQuestionRepository.findByMemberAndIsDailyAndServedAt(
                member, true, today
        );

        // 2. 데일리 질문이 3개라면 그대로 반환
        if (dailyQuestions.size() == 3) {
            return dailyQuestions.stream()
                    .map(ServedQuestion::getQuestion) // ServedQuestion에서 Question 추출
                    .collect(Collectors.toList());
        }
        else if (dailyQuestions.size() > 0) {
            throw new IllegalStateException("오늘의 질문이 3개가 아닌 오류 발생");
        }
        return CreateRandomQuestions(member);
    }

    private List<Question> CreateRandomQuestions(Member member) {
        // 현재 날짜
        LocalDate currentDate = LocalDate.now();

        // 1. Member가 최근 5일 내에 제공받은 질문 조회
        List<ServedQuestion> recentServedQuestions = servedQuestionRepository.findByMemberAndServedAtAfter(
                member, currentDate.minusDays(5)
        );

        // 2. 가중치 계산을 위한 Map 생성 (questionId -> 가중치)
        Map<Long, Long> questionWeights = new HashMap<>();

        for (ServedQuestion servedQuestion : recentServedQuestions) {
            long daysSinceServed = (long) ChronoUnit.DAYS.between(servedQuestion.getServedAt(), currentDate);
            long weight;
            long notSolvedQWeight = 2; // 못 푼 문제 가중치 상수
            long solvedQWeight = 1; // 푼 문제 가중치 상수

            if (servedQuestion.getIsSolved()) {
                // 푼 문제: 가중치 = (현재 날짜 - 푼 날짜)
                weight = daysSinceServed * solvedQWeight;
            } else {
                // 못 푼 문제: 가중치 = (현재 날짜 - 푼 날짜) * A + 100
                weight = daysSinceServed * notSolvedQWeight + 100;
            }

            questionWeights.put(servedQuestion.getQuestion().getId(), weight);
        }

        // 3. 모든 Question 가져오기
        List<Question> allQuestions = questionRepository.findAll();

        // 4. 제공되지 않은 문제의 가중치를 100으로 설정
        for (Question question : allQuestions) {
            if (!questionWeights.containsKey(question.getId())) {
                questionWeights.put(question.getId(), 100L);
            }
        }

        // 5. 가중치 기반 랜덤 선택
        List<Question> selectedQuestions = new ArrayList<>();
        Random random = new Random();

        while (selectedQuestions.size() < 3 && !allQuestions.isEmpty()) {
            // 전체 가중치 합 계산
            long totalWeight = questionWeights.values().stream().mapToLong(Long::longValue).sum();

            // 랜덤 값 생성 (0 ~ totalWeight)
            long randomValue = random.nextLong(totalWeight);

            // 랜덤 값에 해당하는 질문 선택
            long cumulativeWeight = 0;
            for (Question question : allQuestions) {
                cumulativeWeight += questionWeights.get(question.getId());
                if (randomValue < cumulativeWeight) {
                    selectedQuestions.add(question);
                    allQuestions.remove(question); // 중복 방지
                    questionWeights.remove(question.getId()); // 가중치 제거
                    break;
                }
            }
        }
        // 6. 선택된 질문 저장 및 업데이트
        LocalDate today = LocalDate.now();

        for (Question question : selectedQuestions) {
            // 이미 존재하는 ServedQuestion 조회
            Optional<ServedQuestion> existingServedQuestion = servedQuestionRepository
                    .findByMemberAndQuestion(member, question);

            if (existingServedQuestion.isPresent()) {
                // 1. 기존 레코드가 존재하면 isDaily=true, servedAt=오늘 날짜로 업데이트
                ServedQuestion servedQuestion = existingServedQuestion.get();
                servedQuestion.updateDailyInfo(true, today);
            } else {
                // 2. 새로운 레코드 생성
                ServedQuestion newServedQuestion = ServedQuestion.builder()
                        .member(member)
                        .question(question)
                        .isSolved(false)
                        .isDaily(true)
                        .servedAt(today)
                        .build();
                servedQuestionRepository.save(newServedQuestion);
            }
        }
        return selectedQuestions;
    }
}
