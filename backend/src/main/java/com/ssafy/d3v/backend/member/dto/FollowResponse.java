package com.ssafy.d3v.backend.member.dto;

import com.ssafy.d3v.backend.member.entity.Member;
import lombok.Builder;

@Builder
public record FollowResponse(
        Long memberId,
        String nickname,
        String profileImg,
        String favoriteJob,
        Long ongoingStreak
) {
    public static FollowResponse from(Member member) {
        return FollowResponse.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .profileImg(member.getProfileImg())
                .favoriteJob(String.valueOf(member.getFavoriteJob()))
                .ongoingStreak(member.getOngoingStreak())
                .build();
    }
}
