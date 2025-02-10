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

    private Member getMember(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
    }
}
