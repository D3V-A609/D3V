package com.ssafy.d3v.backend.question.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.member.service.MemberService;
import com.ssafy.d3v.backend.question.dto.JobDto;
import com.ssafy.d3v.backend.question.dto.QuestionDto;
import com.ssafy.d3v.backend.question.dto.SkillDto;
import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.QuestionJob;
import com.ssafy.d3v.backend.question.entity.QuestionSkill;
import com.ssafy.d3v.backend.question.entity.ServedQuestion;
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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final ServedQuestionRepository servedQuestionRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final JobRepository jobRepository;
    private final TopQuestionCacheRepository topQuestionCacheRepository; // Redis 캐시 저장소
    private final ObjectMapper objectMapper;
    private final RedisTemplate<String, Object> redisTemplate;
    @Resource(name = "redisTemplate")
    private ValueOperations<String, Object> listValueOperations;
    private static final String JOBS_CACHE_PREFIX = "jobsByQuestion:";
    private static final String SKILLS_CACHE_PREFIX = "skillsByQuestion:";
    private static final String DAILY_QUESTIONS_CACHE_PREFIX = "dailyQuestions:";


    @Transactional
    public List<QuestionDto> getDailyQuestions() {
        Member member = memberService.getMember();

        // 현재 날짜
        LocalDate today = LocalDate.now();
        String cacheKey = DAILY_QUESTIONS_CACHE_PREFIX + member.getId() + ":" + today;

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
                    .toList();

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

        // 가중치 계산
        // 푼 날짜, 풀었는지 여부 가중치만 설정되어있음
        // 답변 수, 도전 수 가중치 추가
        // 직무 추가

        //현재 날짜
        LocalDate currentDate = LocalDate.now();

        // 1. Member가 최근 5일 내에 제공받은 질문 조회
        List<ServedQuestion> recentServedQuestions = servedQuestionRepository.findByMemberAndServedAtAfter(
                member, currentDate.minusDays(5)
        );

        // 2. 가중치 계산을 위한 Map 생성 (questionId -> 가중치)
        Map<Long, Long> questionWeights = new HashMap<>();

        for (ServedQuestion servedQuestion : recentServedQuestions) {
            long daysSinceServed = ChronoUnit.DAYS.between(servedQuestion.getServedAt(), currentDate);
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

        // [추가] 5. 추가 가중치 적용: 답변 수, 도전 수, 희망 직무
        long answerWeight = 1; // 답변 수당 가중치
        long challengeWeight = 1; // 도전 수당 가중치
        long jobMatchWeight = 100; // 희망 직무 일치 시 추가 가중치

        String favoriteJob = member.getFavoriteJob().name(); // Member에서 희망 직무 가져오기

        for (Question question : allQuestions) {
            long currentWeight = questionWeights.get(question.getId());

            // 답변 수 가중치 추가
            currentWeight += question.getAnswerCount() * answerWeight;

            // 도전 수 가중치 추가
            currentWeight += question.getChallengeCount() * challengeWeight;

            // 희망 직무 일치 여부 확인
            if (favoriteJob != null) {
                List<String> questionJobs = question.getQuestionJobs().stream()
                        .map(QuestionJob::getJob)
                        .map(Job::getJobRole)
                        .map(JobRole::name)
                        .toList();
                if (questionJobs.contains(favoriteJob)) {
                    currentWeight += jobMatchWeight;
                }
            }

            questionWeights.put(question.getId(), currentWeight);
        }

        // 6. 가중치 기반 랜덤 선택
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
        // 7. 선택된 질문 저장 및 업데이트
        LocalDate today = LocalDate.now();

        for (Question question : selectedQuestions) {
            // 이미 존재하는 ServedQuestion 조회
            Optional<ServedQuestion> existingServedQuestion = servedQuestionRepository
                    .findByMember_IdAndQuestion_Id(member.getId(), question.getId());

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

    public Question getById(Long questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(
                        () -> new QuestionNotFoundException("Question not found with id: " + questionId));
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
        YearMonth yearMonth = YearMonth.parse(month, formatter);

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

    public Page<Question> getQuestions(List<String> jobStrings, List<String> skillStrings, String solvedFilter,
                                       String order,
                                       String sort, int page, int size, String keyword) {
        Member member = memberService.getMember();
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

    public List<JobDto> getJobsByQuestionId(Long questionId) {
        String cacheKey = JOBS_CACHE_PREFIX + questionId;

        // 1. Redis에서 캐시 조회
        listValueOperations = redisTemplate.opsForValue();
        List<JobDto> cachedJobs =
                objectMapper.convertValue(
                        listValueOperations.get(cacheKey),
                        new TypeReference<>() {
                        }
                );
        if (cachedJobs != null) {
            log.info("== 캐시에서 jobs 데이터 조회: questionId={} ==", questionId);
            return cachedJobs;
        }

        // 2. 캐시에 데이터가 없으면 DB에서 조회
        log.info("== DB에서 jobs 데이터 조회: questionId={} ==", questionId);
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Question ID"));

        List<JobDto> jobs = question.getQuestionJobs().stream()
                .map(QuestionJob::getJob)
                .map(JobDto::from)
                .toList();

        // 3. 결과를 Redis에 저장 (TTL: 1일)
        listValueOperations.set(cacheKey, jobs, Duration.ofDays(1));

        return jobs;
    }

    public List<SkillDto> getSkillsByQuestionId(Long questionId) {
        String cacheKey = SKILLS_CACHE_PREFIX + questionId;

        // 1. Redis에서 캐시 조회
        listValueOperations = redisTemplate.opsForValue();
        List<SkillDto> cachedskills =
                objectMapper.convertValue(
                        listValueOperations.get(cacheKey),
                        new TypeReference<>() {
                        }
                );
        if (cachedskills != null) {
            log.info("== 캐시에서 skills 데이터 조회: questionId={} ==", questionId);
            return cachedskills;
        }

        // 2. 캐시에 데이터가 없으면 DB에서 조회
        log.info("== DB에서 skills 데이터 조회: questionId={} ==", questionId);
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Question ID"));

        List<SkillDto> skills = question.getQuestionSkills().stream()
                .map(QuestionSkill::getSkill)
                .map(SkillDto::from)
                .toList();

        // 3. 결과를 Redis에 저장 (TTL: 1일)
        listValueOperations.set(cacheKey, skills, Duration.ofDays(1));

        return skills;
    }

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
