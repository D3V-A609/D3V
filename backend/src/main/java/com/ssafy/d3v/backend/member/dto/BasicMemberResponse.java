package com.ssafy.d3v.backend.member.dto;

import com.ssafy.d3v.backend.question.entity.JobRole;
import lombok.Builder;

@Builder
public record BasicMemberResponse(long memberId, String nickname, String profileImg, JobRole favoriteJob) {
}
