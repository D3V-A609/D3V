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
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(
        name = "served_question",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"member_id", "question_id"})
        }
)
public class ServedQuestion {
    @Id
    @Column(name = "served_question_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(name = "is_solved")
    private Boolean isSolved;

    @Column(name = "is_daily")
    private Boolean isDaily;

    @Column(name = "served_at")
    private LocalDate servedAt;

    public void updateDailyInfo(boolean isDaily, LocalDate servedAt) {
        this.isDaily = isDaily;
        this.servedAt = servedAt;
    }
}
