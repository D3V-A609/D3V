package com.ssafy.d3v.backend.member.entity;

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
public class Follow {
    @Id
    @Column(name = "follow_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer followId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id", nullable = false)
    private Member followingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id", nullable = false)
    private Member followerId;
}
