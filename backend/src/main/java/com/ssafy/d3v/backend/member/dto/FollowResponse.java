package com.ssafy.d3v.backend.member.dto;

import com.ssafy.d3v.backend.member.entity.Member;
import lombok.Builder;

@Builder
public record FollowResponse(
        Long memberId,
        String nickname,
        long maxStreak,
        long ongoingStreak
) {
    public static FollowResponse from(Member member) {
        return FollowResponse.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .maxStreak(member.getMaxStreak())
                .ongoingStreak(member.getOngoingStreak())
                .build();
    }
}
