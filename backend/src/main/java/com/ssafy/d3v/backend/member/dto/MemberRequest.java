package com.ssafy.d3v.backend.member.dto;

import com.ssafy.d3v.backend.question.entity.JobRole;

public record MemberRequest(
        String nickname,
        String password,
        String githubUrl,
        JobRole favoriteJob) {
}
