package com.ssafy.d3v.backend.member.dto;

import java.util.List;
import lombok.Builder;

@Builder
public record FollowsResponse(Long memberId, List<FollowResponse> follows) {
}
