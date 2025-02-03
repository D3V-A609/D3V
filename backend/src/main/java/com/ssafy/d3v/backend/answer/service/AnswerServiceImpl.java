package com.ssafy.d3v.backend.answer.service;

import com.ssafy.d3v.backend.answer.dto.AnswerRequest;
import com.ssafy.d3v.backend.answer.dto.AnswerResponse;
import com.ssafy.d3v.backend.answer.dto.LatestQuestionResponse;
import com.ssafy.d3v.backend.answer.dto.StandardAnswerResponse;
import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.answer.repository.AnswerRepository;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.ServedQuestion;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import com.ssafy.d3v.backend.question.repository.ServedQuestionCustomRepository;
import com.ssafy.d3v.backend.question.repository.ServedQuestionRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final ServedQuestionRepository servedQuestionRepository;
    private final ServedQuestionCustomRepository servedQuestionCustomRepository;
    private final MemberRepository memberRepository;
    private final Long memberId = 1L;
    @Override
    public StandardAnswerResponse getStandardAnswer(long questionId) {
        Question question = getQuestionById(questionId);
        Member member = getMemberById();

        boolean hasAnswerToday = answerRepository.existsByQuestionAndMemberAndCreatedAtAfter(question, member, LocalDateTime.now().toLocalDate().atStartOfDay());

        if (!hasAnswerToday) {
            throw new IllegalStateException("오늘 작성한 답변이 없습니다. 질문 ID: " + questionId);
        }

        boolean isSolved = servedQuestionRepository.findByMemberAndQuestion(member, question)
                .map(ServedQuestion::getIsSolved)
                .orElse(false);

        return new StandardAnswerResponse(questionId, question.getContent(), question.getStandardAnswer(), isSolved);
    }

}
