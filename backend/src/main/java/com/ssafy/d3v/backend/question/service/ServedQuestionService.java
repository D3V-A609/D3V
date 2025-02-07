package com.ssafy.d3v.backend.question.service;

import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.question.dto.ServedQuestionCreateRequest;
import com.ssafy.d3v.backend.question.dto.ServedQuestionUpdateRequest;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.ServedQuestion;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import com.ssafy.d3v.backend.question.repository.ServedQuestionRepository;
import com.ssafy.d3v.backend.question.dto.ServedQuestionDto;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ServedQuestionService{

    private final ServedQuestionRepository servedQuestionRepository;
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;
    private final Long tempMemeberId = 1L; // 임시 아이디

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
            return ServedQuestionDto.from(servedQuestionRepository.save(servedQuestion));
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
    public ServedQuestionDto updateServedQuestion(Long id, ServedQuestionUpdateRequest dto) {
        ServedQuestion servedQuestion = servedQuestionRepository.findById(id)
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

        return ServedQuestionDto.from(updatedServedQuestion);
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

    public String getIsSolvedStatus(Question question) {
        Member member = memberRepository.findById(tempMemeberId)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));
        Optional<ServedQuestion> servedQuestionOptional =
                servedQuestionRepository.findByMemberAndQuestion(member, question);

        if (servedQuestionOptional.isPresent()) {
            Boolean isSolved = servedQuestionOptional.get().getIsSolved();
            return isSolved ? "solved" : "unSolved";
        } else {
            return "notSolved";
        }
    }


}
