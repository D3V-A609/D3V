package com.ssafy.d3v.backend.member.service;

import com.ssafy.d3v.backend.member.dto.FollowResponse;
import com.ssafy.d3v.backend.member.dto.FollowsResponse;
import com.ssafy.d3v.backend.member.entity.Follow;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.FollowRepository;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;

    @Override
    @Transactional
    public FollowsResponse follow(Long followId) {
        String memberName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(memberName);
        Member followingMember = memberRepository.findById(followId).orElseThrow(() -> new RuntimeException("유저가 없어요"));

        if (followRepository.existsByFollowerAndFollowing(member, followingMember)) {
            throw new IllegalStateException("이미 팔로우한 사용자입니다.");
        }

        if (member.equals(followingMember)) {
            throw new IllegalStateException("자기 자신을 팔로우할 수 없습니다.");
        }

        followRepository.save(Follow.builder()
                .follower(member)
                .following(followingMember)
                .build());

        List<FollowResponse> follows = followRepository.findAllByFollower(member)
                .stream()
                .map(follow -> FollowResponse.from(follow.getFollowing()))
                .toList();
        return FollowsResponse.builder()
                .memberId(member.getId())
                .follows(follows)
                .build();
    }

    @Override
    @Transactional
    public void unfollow(Long followId) {
        String memberName = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findMemberByEmail(memberName);
        Member unfollowingMember = memberRepository.findById(followId)
                .orElseThrow(() -> new RuntimeException("유저가 없어요"));

        followRepository.deleteByFollowerAndFollowing(member, unfollowingMember);
    }

    @Override
    public FollowsResponse getFollowers(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        List<FollowResponse> follows = followRepository.findAllByFollowing(member)
                .stream()
                .map(follow -> FollowResponse.from(follow.getFollower()))
                .toList();
        return FollowsResponse.builder()
                .memberId(memberId)
                .follows(follows)
                .build();
    }

    @Override
    public FollowsResponse getFollowings(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        List<FollowResponse> follows = followRepository.findAllByFollower(member)
                .stream()
                .map(follow -> FollowResponse.from(follow.getFollowing()))
                .toList();
        return FollowsResponse.builder()
                .memberId(memberId)
                .follows(follows)
                .build();
    }
}
