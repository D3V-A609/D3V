package com.ssafy.d3v.backend.question.entity;

import com.ssafy.d3v.backend.member.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@ToString
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class ServedQuestion {
    @Id
    @Column(name = "served_question_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer servedQuestionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member memberId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question questionId;

    @Column(name = "is_solved")
    private boolean isSolved;

    @Column(name = "is_daily")
    private boolean isDaily;

    @Column(name = "served_at")
    private LocalDate servedAt;
}
