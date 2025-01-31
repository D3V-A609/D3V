
package com.ssafy.d3v.backend.like.entity;

import com.ssafy.d3v.backend.answer.entity.Answer;
import com.ssafy.d3v.backend.member.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@ToString
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Likes {
    @Id
    @Column(name = "likes_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer likesId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answer_id", nullable = false)
    private Answer answerId;
}
