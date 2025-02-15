package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.question.dto.QuestionDto;
import com.ssafy.d3v.backend.question.dto.QuestionResponse;
import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.JobRole;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.QuestionJob;
import com.ssafy.d3v.backend.question.entity.QuestionSkill;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.entity.SkillType;
import com.ssafy.d3v.backend.question.entity.TopQuestionCache;
import com.ssafy.d3v.backend.question.exception.QuestionNotFoundException;
import com.ssafy.d3v.backend.question.repository.JobRepository;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import com.ssafy.d3v.backend.question.repository.ServedQuestionRepository;
import com.ssafy.d3v.backend.question.repository.TopQuestionCacheRepository;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
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
    private final ServedQuestionService servedQuestionService;

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

    public List<Job> getJobsByQuestionId(Long questionId) {
        // Question 엔티티에서 연관된 QuestionJob을 통해 Job 리스트를 추출
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Question ID"));
        log.info("==getJobsByQuestionId== question :" + question.toString());
        return question.getQuestionJobs().stream()
                .map(QuestionJob::getJob)
                .collect(Collectors.toList());
    }

    public List<Skill> getSkillsByQuestionId(Long questionId) {
        // Question 엔티티에서 연관된 QuestionSkill을 통해 Skill 리스트를 추출
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Question ID"));
        log.info("==getSkillsByQuestionId== question :" + question.toString());
        return question.getQuestionSkills().stream()
                .map(QuestionSkill::getSkill)
                .collect(Collectors.toList());
    }

    private ResponseEntity<List<QuestionResponse>> getListResponseEntity(List<QuestionDto> questions) {
        List<QuestionResponse> questionResponseList = questions.stream()
                .map(this::createQuestionResponse)
                .toList();
        return ResponseEntity.ok(questionResponseList);
    }

    private QuestionResponse createQuestionResponse(QuestionDto question) {
        String solved = servedQuestionService.getIsSolvedStatus(question.id());
        List<Skill> skills = getSkillsByQuestionId(question.id());
        List<Job> jobs = getJobsByQuestionId(question.id());
        return QuestionResponse.of(question, solved, skills, jobs);
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
