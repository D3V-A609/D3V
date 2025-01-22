package com.ssafy.d3v.backend.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@ToString
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class Member {
    @Id
    @Column(name = "memberId_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;
    @NotBlank
    private String nickname;
    @NotBlank
    private String email;
    @NotBlank
    private String password;

    private String profileImg;

    private String githubUrl;

    private int maxStreak;

    private int ongoingStreak;

    private boolean isDeleted;
}
