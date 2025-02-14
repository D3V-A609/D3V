package com.ssafy.d3v.backend.member.dto;

import com.ssafy.d3v.backend.question.entity.JobRole;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record MemberResponse(long memberId, String nickname, String email, String profileImg,
                             String githubUrl, long maxStreak, long ongoingStreak, String providerType,
                             LocalDateTime createdAt, JobRole favoriteJob, int followerCount, int followingCount) {
}
