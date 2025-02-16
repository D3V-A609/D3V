package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.question.dto.ServedQuestionCreateRequest;
import com.ssafy.d3v.backend.question.dto.ServedQuestionDto;
import com.ssafy.d3v.backend.question.dto.ServedQuestionUpdateRequest;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.ServedQuestion;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import com.ssafy.d3v.backend.question.repository.ServedQuestionRepository;
import jakarta.persistence.EntityNotFoundException;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ServedQuestionService {

    private final ServedQuestionRepository servedQuestionRepository;
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String SOLVED_CACHE_PREFIX = "solvedStatus:";
    private final Long tempMemberId = 1L; // 임시 아이디

    @Transactional
    public ServedQuestionDto createServedQuestion(ServedQuestionCreateRequest dto, Boolean isDaily) {

        Member member = memberRepository.findById(dto.memberId())
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        Question question = questionRepository.findById(dto.questionId())
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));

        try {
            ServedQuestion servedQuestion = ServedQuestion.builder()
                    .member(member)
                    .question(question)
                    .isSolved(dto.isSolved())
                    .isDaily(isDaily)
                    .servedAt(LocalDate.now())
                    .build();
            ServedQuestion savedServedQuestion = servedQuestionRepository.save(servedQuestion);

            cacheServedQuestion(savedServedQuestion);

            return ServedQuestionDto.from(savedServedQuestion);
        } catch (DataIntegrityViolationException e) {
            // ConstraintViolationException 처리
            throw new IllegalStateException("동일한 memberId와 questionId를 가진 ServedQuestion이 이미 존재합니다.", e);
        }
    }

    public ServedQuestionDto getServedQuestion(Long id) {
        return ServedQuestionDto.from(servedQuestionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ServedQuestion not found")));
    }

    public List<ServedQuestionDto> getAllServedQuestions() {
        return servedQuestionRepository.findAll().stream()
                .map(ServedQuestionDto::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public ServedQuestionDto updateServedQuestion(Long questionId, ServedQuestionUpdateRequest dto) {
        ServedQuestion servedQuestion = servedQuestionRepository.findByMember_IdAndQuestion_Id(tempMemberId, questionId)
                .orElseThrow(() -> new EntityNotFoundException("ServedQuestion not found"));

        ServedQuestion updatedServedQuestion = ServedQuestion.builder()
                .id(servedQuestion.getId())
                .member(servedQuestion.getMember())
                .question(servedQuestion.getQuestion())
                .isSolved(dto.isSolved() != null ? dto.isSolved() : servedQuestion.getIsSolved())
                .isDaily(dto.isDaily() != null ? dto.isDaily() : servedQuestion.getIsDaily())
                .servedAt(dto.servedAt() != null ? dto.servedAt() : servedQuestion.getServedAt())
                .build();

        servedQuestionRepository.save(updatedServedQuestion);

        // 4. Redis 캐시 갱신 (isSolved 값이 변경된 경우)
        if (dto.isSolved() != null) {
            cacheServedQuestion(updatedServedQuestion);
        }

        return ServedQuestionDto.from(updatedServedQuestion);
    }

    private void cacheServedQuestion(ServedQuestion servedQuestion) {
        // Redis 캐시 키 생성
        String cacheKey =
                SOLVED_CACHE_PREFIX + servedQuestion.getMember().getId() + ":" + servedQuestion.getQuestion().getId();

        // 새로운 isSolved 상태를 캐시에 저장
        String solvedStatus = servedQuestion.getIsSolved() ? "solved" : "unSolved";
        redisTemplate.opsForValue().set(cacheKey, solvedStatus, Duration.ofDays(1)); // TTL: 1일

        log.info("== Redis Solved 캐시 갱신: key={}, value={} ==", cacheKey, solvedStatus);
    }


    public List<ServedQuestionDto> getServedQuestionsByMemberId(Long memberId) {
        // Member 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));

        // ServedQuestion 조회
        List<ServedQuestion> servedQuestions = servedQuestionRepository.findByMember(member);

        // DTO로 변환하여 반환
        return servedQuestions.stream()
                .map(ServedQuestionDto::from)
                .collect(Collectors.toList());
    }

    public String getIsSolvedStatus(Long questionId) {
        String cacheKey = SOLVED_CACHE_PREFIX + tempMemberId + ":" + questionId; // Redis 캐시 키 생성

        // 1. Redis에서 캐시 조회
        String cachedStatus = (String) redisTemplate.opsForValue().get(cacheKey);
        if (cachedStatus != null) {
            log.info("== 캐시에서 solved 데이터 조회: memberId={}, questionId={} ==", tempMemberId, questionId);
            return cachedStatus;
        }

        // 2. 캐시에 데이터가 없으면 DB에서 조회
        log.info("== DB에서 solved 데이터 조회: memberId={}, questionId={} ==", tempMemberId, questionId);
        Optional<ServedQuestion> servedQuestionOptional =
                servedQuestionRepository.findByMember_IdAndQuestion_Id(tempMemberId, questionId);

        String status;
        if (servedQuestionOptional.isPresent()) {
            Boolean isSolved = servedQuestionOptional.get().getIsSolved();
            status = isSolved ? "solved" : "unSolved";
        } else {
            status = "notSolved";
        }

        // 3. 결과를 Redis에 저장 (TTL: 1일)
        redisTemplate.opsForValue().set(cacheKey, status, Duration.ofDays(1));

        return status;
    }

}
