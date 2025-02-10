package com.ssafy.d3v.backend.question.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.question.dto.QuestionDto;
import com.ssafy.d3v.backend.question.dto.QuestionResponse;
import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.QuestionJob;
import com.ssafy.d3v.backend.question.entity.QuestionSkill;
import com.ssafy.d3v.backend.question.entity.ServedQuestion;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.entity.SkillType;
import com.ssafy.d3v.backend.question.entity.TopQuestionCache;
import com.ssafy.d3v.backend.question.exception.QuestionNotFoundException;
import com.ssafy.d3v.backend.question.repository.JobRepository;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import com.ssafy.d3v.backend.question.repository.ServedQuestionRepository;
import com.ssafy.d3v.backend.question.repository.TopQuestionCacheRepository;
import jakarta.annotation.Resource;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {

    private final Long TempMemeberId = 1L; // 임시 아이디
    private final QuestionRepository questionRepository;
    private final ServedQuestionRepository servedQuestionRepository;
    private final MemberRepository memberRepository;
    private final JobRepository jobRepository;
    private final TopQuestionCacheRepository topQuestionCacheRepository; // Redis 캐시 저장소
    private final ObjectMapper objectMapper;
    private final RedisTemplate<String, Object> redisTemplate;
    @Resource(name = "redisTemplate")
    private ValueOperations<String, Object> listValueOperations;
    private static final String DAILY_QUESTIONS_CACHE_PREFIX = "dailyQuestions:";

    public Question getById(Long questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new QuestionNotFoundException("Question not found with id: " + questionId));
    }

    public Page<Question> getAllQuestions(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return questionRepository.findAll(pageable);
    }

    //    public List<Question> getDailyQuestions() {
//        Long memberId = TempMemeberId; // 임시코드, MemberId를 토큰에서 가져오도록 변경해야함
//        Member member = memberRepository.findById(memberId)
//                .orElseThrow(() -> new IllegalArgumentException("Member not found with ID: " + memberId));
//        // 현재 날짜
//        LocalDate today = LocalDate.now();
//
//        // question: 매번 데일리 질문이 존재하는지 확인하는 로직을 Redis에 데일리 질문을 저장해서 확인하는 방법으로 개선할 수 있을 것 같다.
//        // 1. 오늘 제공된 데일리 질문 조회
//        List<ServedQuestion> dailyQuestions = servedQuestionRepository.findByMemberAndIsDailyAndServedAt(
//                member, true, today
//        );
//
//        // 2. 데일리 질문이 3개라면 그대로 반환
//        if (dailyQuestions.size() == 3) {
//            return dailyQuestions.stream()
//                    .map(ServedQuestion::getQuestion) // ServedQuestion에서 Question 추출
//                    .collect(Collectors.toList());
//        } else if (dailyQuestions.size() > 0) {
//            throw new IllegalStateException("오늘의 질문이 3개가 아닌 오류 발생");
//        }
//        return CreateRandomQuestions(member); // 데일리 질문이 없는 경우 생성
//    }
    public List<QuestionDto> getDailyQuestions() {
        Long memberId = TempMemeberId; // 임시 코드, 실제로는 토큰에서 가져오도록 수정 필요
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with ID: " + memberId));

        // 현재 날짜
        LocalDate today = LocalDate.now();
        String cacheKey = DAILY_QUESTIONS_CACHE_PREFIX + memberId + ":" + today;

        // 1. Redis에서 캐시된 데일리 질문 조회
        listValueOperations = redisTemplate.opsForValue();
        List<QuestionDto> cachedQuestions =
                objectMapper.convertValue(
                        listValueOperations.get(cacheKey),
                        new TypeReference<>() {
                        }
                );
        if (cachedQuestions != null) {
            return cachedQuestions; // 캐시된 질문 반환
        }

        // 2. 데이터베이스에서 오늘의 질문 조회
        List<ServedQuestion> dailyQuestions = servedQuestionRepository.findByMemberAndIsDailyAndServedAt(
                member, true, today);

        // 3. 데일리 질문이 3개라면 캐시에 저장 후 반환
        if (dailyQuestions.size() == 3) {
            List<QuestionDto> questions = dailyQuestions.stream()
                    .map(ServedQuestion::getQuestion)
                    .map(QuestionDto::from)
                    .collect(Collectors.toList());

            listValueOperations.set(cacheKey, questions, Duration.ofDays(1)); // TTL 설정 (1일)
            return questions;
        } else if (dailyQuestions.size() > 0) {
            throw new IllegalStateException("오늘의 질문이 3개가 아닌 오류 발생");
        }

        // 4. 데일리 질문이 없는 경우 새로 생성하고 캐시에 저장
        List<QuestionDto> newQuestions = CreateRandomQuestions(member).stream().map(QuestionDto::from).toList();
        listValueOperations.set(cacheKey, newQuestions, Duration.ofDays(1)); // TTL 설정 (1일)
        return newQuestions;
    }

    @Transactional
    public List<Question> CreateRandomQuestions(Member member) {

        // 데일리 생성 로직이 현재는 로그인 시 생성하는 방식인데 스케줄러 써서 개선할 수 있을 것 같다.
        // 추가로 개인별 맞춤으로 다른 가중치도 추가할 예정
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
                    .findByMemberAndQuestion_Id(member, question.getId());

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

    /**
     * 특정 직무와 월에 대한 Top 10 질문 조회 (캐시 우선).
     */
    public List<QuestionDto> getTop10Questions(String month, String jobRoleString) {
        String cacheKey = jobRoleString.toUpperCase() + "-" + month;

        // Redis에서 데이터 조회
        return topQuestionCacheRepository.findById(cacheKey)
                .map(TopQuestionCache::getQuestions)
                .orElseGet(() -> {
                    System.out.println("Cache miss for " + cacheKey + ". Generating data...");

                    // 캐시에 없으면 데이터를 생성
                    generateAndSaveTop10QuestionsForAllJobs(month);

                    // 다시 캐시에서 조회
                    return topQuestionCacheRepository.findById(cacheKey)
                            .map(TopQuestionCache::getQuestions)
                            .orElseThrow(() -> new IllegalStateException(
                                    "Failed to generate and cache Top 10 questions for: " + cacheKey));
                });
    }

    /**
     * 모든 직무에 대해 Top 10 질문을 생성하고 저장 (Redis 사용).
     */
    @Transactional
    public void generateAndSaveTop10QuestionsForAllJobs(String month) {
        // 모든 직무 가져오기
        List<JobRole> allJobs = jobRepository.findAll().stream().map(Job::getJobRole).toList();

        // "yyyy-MM" 형식의 문자열을 YearMonth로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
        YearMonth yearMonth = YearMonth.parse(month, formatter).minusMonths(1); // 이전 달 계산

        LocalDateTime startDate = yearMonth.atDay(1).atStartOfDay(); // 월의 첫 번째 날 00:00:00
        LocalDateTime endDate = yearMonth.atEndOfMonth().atTime(23, 59, 59); // 월의 마지막 날 23:59:59

        // 각 직무에 대해 Top 10 질문 처리
        for (JobRole job : allJobs) {
            String cacheKey = job.name() + "-" + month; // e.g., "DEVELOPER-2025-01"

            // Redis에서 데이터 조회
            if (topQuestionCacheRepository.existsById(cacheKey)) {
                System.out.println(
                        "Top 10 questions for " + job + " in " + month + " already exist in cache. Skipping...");
                continue;
            }

            // Top 10 질문 조회 (DB)
            System.out.println("Generating top 10 questions for " + job + " in " + month + " ...");
            List<QuestionDto> topQuestions = questionRepository.findTop10QuestionsByAnswerCount(startDate, endDate,
                            job).stream()
                    .map(QuestionDto::from)
                    .toList();

            // Redis에 데이터 저장
            TopQuestionCache topQuestionCache = TopQuestionCache.builder()
                    .id(cacheKey)
                    .jobRole(job.name())
                    .month(month)
                    .questions(topQuestions)
                    .build();
            topQuestionCacheRepository.save(topQuestionCache);

            System.out.println("Top 10 questions for " + job + " in " + month + " saved to cache.");
        }
    }

    public List<Job> getJobsByQuestionId(Long questionId) {
        // Question 엔티티에서 연관된 QuestionJob을 통해 Job 리스트를 추출
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Question ID"));
        return question.getQuestionJobs().stream()
                .map(QuestionJob::getJob)
                .collect(Collectors.toList());
    }

    public List<Skill> getSkillsByQuestionId(Long questionId) {
        // Question 엔티티에서 연관된 QuestionSkill을 통해 Skill 리스트를 추출
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Question ID"));
        return question.getQuestionSkills().stream()
                .map(QuestionSkill::getSkill)
                .collect(Collectors.toList());
    }

    public Page<QuestionResponse> getQuestions(List<String> jobStrings, List<String> skillStrings, String solvedFilter,
                                               String order,
                                               String sort, int page, int size, String keyword) {
        Long memberId = TempMemeberId; // 임시코드, MemberId를 토큰에서 가져오도록 변경해야함
        Member member = memberRepository.findById(memberId).orElseThrow();

        List<JobRole> jobs = convertToEnum(jobStrings, JobRole.class);
        List<SkillType> skills = convertToEnum(skillStrings, SkillType.class);
        return questionRepository.searchQuestions(
                jobs,
                skills,
                member,
                solvedFilter,
                order,
                sort,
                page,
                size,
                keyword
        );
    }

    /**
     * 문자열 리스트를 Enum 리스트로 변환하는 유틸리티 메서드.
     *
     * @param <E>       Enum 타입
     * @param values    문자열 리스트
     * @param enumClass Enum 클래스 타입
     * @return 변환된 Enum 리스트
     */
    private <E extends Enum<E>> List<E> convertToEnum(List<String> values, Class<E> enumClass) {
        if (values == null || values.isEmpty()) {
            return List.of(); // 빈 리스트 반환
        }

        try {
            return values.stream()
                    .map(value -> Enum.valueOf(enumClass, value.toUpperCase())) // 대소문자 무시하고 매핑
                    .toList();
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid value for enum " + enumClass.getSimpleName() + ": " + values);
        }
    }
}
