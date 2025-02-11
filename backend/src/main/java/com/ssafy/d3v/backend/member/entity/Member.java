package com.ssafy.d3v.backend.member.entity;

import com.ssafy.d3v.backend.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
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
public class Member extends BaseEntity {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nickname;

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    @NotBlank
    private MemberStatus status;

    @Column(name = "profile_img")
    private String profileImg;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "max_streak")
    private Long maxStreak;

    @Column(name = "ongoing_streak")
    private Long ongoingStreak;

    @Column(name = "provider_type")
    private String providerType;

    @Builder
    public Member(String nickname, String email, String password) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }

    public void updatePassword(String password) {
        this.password = password;
    }
}
