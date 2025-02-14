package com.ssafy.d3v.backend.member.controller;

import com.ssafy.d3v.backend.member.dto.FollowsResponse;
import com.ssafy.d3v.backend.member.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "팔로우", description = "팔로워/팔로잉 API")
public class FollowController {
    private final FollowService followService;

    @Operation(summary = "팔로우")
    @PostMapping("/follow/{following_id}")
    public ResponseEntity<?> follow(@PathVariable(value = "following_id") Long memberId
    ) {
        followService.follow(memberId);
        return ResponseEntity.ok("팔로우에 성공했습니다.");
    }

    @Operation(summary = "팔로우 취소")
    @DeleteMapping("/follow/{following_id}")
    public ResponseEntity<?> unfollow(@PathVariable(value = "following_id") Long memberId) {
        followService.unfollow(memberId);
        return ResponseEntity.ok("팔로우 취소에 성공했습니다.");
    }

    @Operation(summary = "팔로잉 목록 조회")
    @GetMapping("/following/{member_id}")
    public ResponseEntity<FollowsResponse> getFollowings(@PathVariable(value = "member_id") Long memberId) {
        FollowsResponse response = followService.getFollowings(memberId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "팔로워 목록 조회")
    @GetMapping("/follower/{member_id}")
    public ResponseEntity<?> getFollowers(@PathVariable(value = "member_id") Long memberId
    ) {
        FollowsResponse response = followService.getFollowers(memberId);
        return ResponseEntity.ok(response);
    }
}
