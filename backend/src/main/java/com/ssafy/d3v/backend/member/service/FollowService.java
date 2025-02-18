package com.ssafy.d3v.backend.member.service;

import com.ssafy.d3v.backend.member.dto.FollowsResponse;

public interface FollowService {
    FollowsResponse follow(Long followId);

    void unfollow(Long followId);

    FollowsResponse getFollowers(Long memberId);

    FollowsResponse getFollowings(Long memberId);
}
