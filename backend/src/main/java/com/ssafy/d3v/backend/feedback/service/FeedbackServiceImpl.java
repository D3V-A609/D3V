package com.ssafy.d3v.backend.feedback.service;

import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.answer.repository.AnswerRepository;
import com.ssafy.d3v.backend.feedback.dto.FeedbackRequest;
import com.ssafy.d3v.backend.feedback.dto.FeedbackResponse;
import com.ssafy.d3v.backend.feedback.entity.Feedback;
import com.ssafy.d3v.backend.feedback.repository.FeedbackRepository;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final AnswerRepository answerRepository;
    private final MemberRepository memberRepository;

    private final Long memberId = 1L;

    @Override
    public List<FeedbackResponse> get(long answerId) {
        List<Feedback> feedbacks = feedbackRepository.findByAnswer(getAnswer(answerId));

        return feedbacks.stream()
                .map(feedback -> getFeedbackResponse(feedback))
                .toList();
    }

    @Override
    @Transactional
    public FeedbackResponse create(long answerId, FeedbackRequest feedbackRequest) {
        Answer answer = getAnswer(answerId);
        Member member = getMember(memberId);

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
        Feedback feedback = getFeedback(feedbackId, getMember(memberId));
        feedback.updateContent(feedbackRequest.content());

        return getFeedbackResponse(feedback);
    }

    private Member getMember(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
    }

    private Answer getAnswer(long answerId) {
        return answerRepository.findById(answerId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 답변입니다."));
    }

    private Feedback getFeedback(long feedbackId, Member member) {
        return feedbackRepository.findByIdAndMember(feedbackId, member)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 피드백입니다."));
    }

    private static FeedbackResponse getFeedbackResponse(Feedback feedback) {
        return FeedbackResponse.builder()
                .feedbackId(feedback.getId())
                .answerId(feedback.getAnswer().getAnswerId())
                .memberId(feedback.getMember().getId())
                .content(feedback.getContent())
                .createdAt(feedback.getCreatedAt())
                .updatedAt(feedback.getUpdatedAt())
                .build();
    }

    @Override
    @Transactional
    public void delete(long answerId, long feedbackId) {
        Feedback feedback = getFeedback(feedbackId, getMember(memberId));

        feedback.delete();
        feedbackRepository.saveAndFlush(feedback);
    }
}
