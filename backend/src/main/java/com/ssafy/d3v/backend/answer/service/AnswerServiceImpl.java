package com.ssafy.d3v.backend.answer.service;

import static java.util.stream.Collectors.toList;

import com.ssafy.d3v.backend.answer.dto.AnswerQuestionResponse;
import com.ssafy.d3v.backend.answer.dto.AnswerRequest;
import com.ssafy.d3v.backend.answer.dto.AnswerResponse;
import com.ssafy.d3v.backend.answer.dto.StandardAnswerResponse;
import com.ssafy.d3v.backend.answer.dto.TextAnswerResponse;
import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.answer.repository.AnswerCustomRepository;
import com.ssafy.d3v.backend.answer.repository.AnswerRepository;
import com.ssafy.d3v.backend.common.dto.PagedResponse;
import com.ssafy.d3v.backend.common.dto.PaginationInfo;
import com.ssafy.d3v.backend.common.exception.SpeechToTextException;
import com.ssafy.d3v.backend.common.util.AccessLevel;
import com.ssafy.d3v.backend.common.util.SpeechToTextConverter;
import com.ssafy.d3v.backend.feedback.repository.FeedbackCustomRepository;
import com.ssafy.d3v.backend.like.repository.LikesRepository;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.ServedQuestion;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import com.ssafy.d3v.backend.question.repository.ServedQuestionCustomRepository;
import com.ssafy.d3v.backend.question.repository.ServedQuestionRepository;
import com.ssafy.d3v.backend.question.service.QuestionService;
import com.ssafy.d3v.backend.question.service.ServedQuestionService;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AnswerServiceImpl implements AnswerService {
    private final AnswerRepository answerRepository;
    private final AnswerCustomRepository answerCustomRepository;
    private final QuestionRepository questionRepository;
    private final ServedQuestionRepository servedQuestionRepository;
    private final ServedQuestionService servedQuestionService;
    private final ServedQuestionCustomRepository servedQuestionCustomRepository;
    private final LikesRepository likesRepository;
    private final MemberRepository memberRepository;
    private final FeedbackCustomRepository feedbackCustomRepository;
    private final QuestionService questionService;
    private final SpeechToTextConverter textConverter;
    private final Long memberId = 1L;

    @Override
    public StandardAnswerResponse getStandardAnswer(long questionId) {
        Question question = getQuestionById(questionId);
        Member member = getMemberById();

        boolean hasAnswer = answerRepository.existsByQuestionAndMember(question, member);
        if (!hasAnswer) {
            throw new IllegalStateException("작성한 답변이 없습니다. 질문 ID: " + questionId);
        }

        boolean isSolved = servedQuestionRepository.findByMemberAndQuestion_Id(member, questionId)
                .map(ServedQuestion::getIsSolved)
                .orElse(false);

        return new StandardAnswerResponse(questionId, question.getContent(), question.getStandardAnswer(), isSolved);
    }

    @Override
    @Transactional
    public List<AnswerResponse> create(long questionId, AnswerRequest answerRequest) {
        Question question = getQuestionById(questionId);
        Member member = getMemberById();

        Answer answer = Answer.builder()
                .member(member)
                .question(question)
                .content(answerRequest.content())
                .createdAt(LocalDateTime.now())
                .accessLevel(AccessLevel.valueOf(answerRequest.accessLevel()))
                .build();

        String isSolvedStatus = servedQuestionService.getIsSolvedStatus(questionId);
        if (isSolvedStatus.equals("notSolved")) {
            question.updateQuestion(question.getAnswerCount() + 1, question.getChallengeCount() + 1);
        } else {
            question.updateQuestion(question.getAnswerCount() + 1, question.getChallengeCount());
        }

        servedQuestionCustomRepository.updateIsSolvedByQuestionAndMember(question, member, answerRequest.isSolved());
        answerRepository.saveAndFlush(answer);

        return getAnswerResponses(question, member);
    }

    @Override
    public List<AnswerResponse> getMyAnswers(long questionId) {
        Question question = getQuestionById(questionId);
        Member member = getMemberById();

        return getAnswerResponses(question, member);
    }

    private List<AnswerResponse> getAnswerResponses(Question question, Member member) {
        return answerRepository.findByQuestionAndMember(question, member)
                .stream()
                .map(ele -> new AnswerResponse(
                        ele.getQuestion().getId(),
                        ele.getMember().getId(),
                        ele.getAnswerId(),
                        ele.getContent(),
                        ele.getCreatedAt(),
                        ele.getAccessLevel(),
                        (int) feedbackCustomRepository.countFeedbackByAnswer(ele),
                        likesRepository.countByAnswer(ele)))
                .toList();
    }

    private Question getQuestionById(long questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 질문 입니다. 질문 ID: " + questionId));
        return question;
    }

    private Member getMemberById() {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 입니다. 회원 ID: " + memberId));
        return member;
    }

    @Override
    public PagedResponse<AnswerResponse> getTotalAnswers(long questionId, int size, int page) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 질문입니다. ID: " + questionId));

        List<Answer> answerList = answerCustomRepository.findPublicAnswersByQuestion(question, size, page);
        long totalRecords = answerCustomRepository.countPublicAnswersByQuestion(question);

        List<AnswerResponse> answerResponses = answerList.stream()
                .map(ele -> new AnswerResponse(
                        ele.getQuestion().getId(),
                        ele.getMember().getId(),
                        ele.getAnswerId(),
                        ele.getContent(),
                        ele.getCreatedAt(),
                        ele.getAccessLevel(),
                        (int) feedbackCustomRepository.countFeedbackByAnswer(ele),
                        likesRepository.countByAnswer(ele)))
                .collect(toList());

        int totalPages = (int) Math.ceil((double) totalRecords / size);
        Integer nextPage = (page < totalPages) ? page + 1 : null;
        Integer prevPage = (page > 1) ? page - 1 : null;

        PaginationInfo paginationInfo = new PaginationInfo(
                totalRecords,
                page,
                totalPages,
                nextPage,
                prevPage
        );
        return new PagedResponse<>(answerResponses, paginationInfo);
    }

    @Override
    @Transactional
    public void updateAccessLevel(long answerId, String accessLevel) {
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답변입니다. ID: " + answerId));

        answer.updateAccessLevel(AccessLevel.valueOf(accessLevel));
        answerRepository.saveAndFlush(answer);
    }

    @Override
    public List<AnswerQuestionResponse> getLastestQuestion(boolean isSolved) {
        Member member = getMemberById();
        List<ServedQuestion> servedQuestions = servedQuestionCustomRepository.findServedQuestions(member.getId(),
                isSolved);

        return servedQuestions.stream()
                .map(ele -> AnswerQuestionResponse.from(
                        ele.getId(),
                        ele.getQuestion().getContent(),
                        ele.getIsSolved(),
                        questionService.getSkillsByQuestionId(ele.getId())))
                .collect(toList());
    }

    @Override
    public TextAnswerResponse convertSpeechToText(byte[] speech) {
        try {
            return TextAnswerResponse.builder()
                    .text(textConverter.convertSpeechToText(speech))
                    .build();
        } catch (IOException e) {
            throw new SpeechToTextException("음성 파일을 변환하는 중 오류 발생");
        }
    }
}
