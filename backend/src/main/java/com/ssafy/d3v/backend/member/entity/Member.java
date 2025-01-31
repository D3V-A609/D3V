package com.ssafy.d3v.backend.member.entity;

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
    @Column(name = "profile_img")
    private String profileImg;
    @Column(name = "github_url")
    private String githubUrl;
    @Column(name = "max_streak")
    private int maxStreak;
    @Column(name = "ongoing_streak")
    private int ongoingStreak;
    @Column(name = "deleted_at")
    private boolean deletedAt;
    @Column(name = "provider_type")
    private String providerType;
}
