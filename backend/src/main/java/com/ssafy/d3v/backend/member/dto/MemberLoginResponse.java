package com.ssafy.d3v.backend.member.dto;

import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.oauth.entity.ProviderType;
import com.ssafy.d3v.backend.question.entity.JobRole;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record MemberLoginResponse(
        long memberId,
        String nickname,
        String email,
        String profileImg,
        String githubUrl,
        long maxStreak,
        long ongoingStreak,
        ProviderType providerType,
        LocalDateTime createdAt,
        JobRole favoriteJob,
        String AccessToken
) {
    public static MemberLoginResponse from(Member member, String accessToken) {
        return MemberLoginResponse.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .profileImg(member.getProfileImg())
                .githubUrl(member.getGithubUrl())
                .maxStreak(member.getMaxStreak())
                .ongoingStreak(member.getOngoingStreak())
                .providerType(member.getProviderType())
                .createdAt(member.getCreatedAt())
                .favoriteJob(member.getFavoriteJob())
                .AccessToken(accessToken)
                .build();
    }
}
