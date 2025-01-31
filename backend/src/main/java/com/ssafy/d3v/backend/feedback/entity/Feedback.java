package com.ssafy.d3v.backend.feedback.entity;

import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.common.BaseEntity;
import com.ssafy.d3v.backend.member.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@ToString
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Feedback extends BaseEntity {
    @Id
    @Column(name = "feedback_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer feedbackId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answer_id", nullable = false)
    private Answer answerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member memberId;

    @NotBlank
    private String content;
}
