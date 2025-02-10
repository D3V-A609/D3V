package com.ssafy.d3v.backend.feedback.repository;

import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.feedback.entity.Feedback;
import com.ssafy.d3v.backend.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByAnswer(Answer answer);

    Optional<Feedback> findByIdAndMember(long feedbackId, Member member);
}
