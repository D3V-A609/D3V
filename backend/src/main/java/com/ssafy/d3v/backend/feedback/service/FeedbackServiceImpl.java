package com.ssafy.d3v.backend.feedback.service;

import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.answer.repository.AnswerRepository;
import com.ssafy.d3v.backend.common.util.SecurityUtil;
import com.ssafy.d3v.backend.feedback.dto.FeedbackRequest;
import com.ssafy.d3v.backend.feedback.dto.FeedbackResponse;
import com.ssafy.d3v.backend.feedback.entity.Feedback;
import com.ssafy.d3v.backend.feedback.repository.FeedbackRepository;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final AnswerRepository answerRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<FeedbackResponse> get(long answerId) {
        List<Feedback> feedbacks = feedbackRepository.findByAnswerOrderByCreatedAtDesc(getAnswer(answerId));

        return feedbacks.stream()
                .map(feedback -> getFeedbackResponse(feedback))
                .toList();
    }

    @Override
    @Transactional
    public FeedbackResponse create(long answerId, FeedbackRequest feedbackRequest) {
        Answer answer = getAnswer(answerId);
        Member member = getMember();

        Feedback feedback = Feedback.builder()
                .answer(answer)
                .member(member)
                .content(feedbackRequest.content())
                .build();

        Feedback saved = feedbackRepository.saveAndFlush(feedback);
        return getFeedbackResponse(saved);
    }

    @Override
    @Transactional
    public FeedbackResponse update(long answerId, long feedbackId, FeedbackRequest feedbackRequest) {
        Feedback feedback = getFeedback(feedbackId, getMember());
        feedback.updateContent(feedbackRequest.content());

        return getFeedbackResponse(feedback);
    }

    private Member getMember() {
        String memberEmail = SecurityUtil.getCurrentMemberEmail();
        return memberRepository.findByEmail(memberEmail)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 입니다. 회원 Email: " + memberEmail));
    }

    private Answer getAnswer(long answerId) {
        return answerRepository.findById(answerId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답변입니다."));
    }

    private Feedback getFeedback(long feedbackId, Member member) {
        return feedbackRepository.findByIdAndMember(feedbackId, member)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 피드백입니다."));
    }

    private FeedbackResponse getFeedbackResponse(Feedback feedback) {
        Answer answer = answerRepository.findById(feedback.getAnswer().getAnswerId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답변입니다."));
        return FeedbackResponse.builder()
                .feedbackId(feedback.getId())
                .answerId(feedback.getAnswer().getAnswerId())
                .memberId(feedback.getMember().getId())
                .questionId(answer.getQuestion().getId())
                .content(feedback.getContent())
                .createdAt(feedback.getCreatedAt())
                .updatedAt(feedback.getUpdatedAt())
                .build();
    }

    @Override
    @Transactional
    public void delete(long answerId, long feedbackId) {
        Feedback feedback = getFeedback(feedbackId, getMember());

        feedback.delete();
        feedbackRepository.saveAndFlush(feedback);
    }

    @Override
    public List<FeedbackResponse> getMyFeedbacks() {
        Member member = getMember();

        return feedbackRepository.findByMemberAndDeletedAtIsNullOrderByCreatedAtDesc(member)
                .stream()
                .map(this::getFeedbackResponse)
                .toList();
    }
}
