package com.ssafy.d3v.backend.member.service;

import com.ssafy.d3v.backend.member.dto.MemberRequest;
import com.ssafy.d3v.backend.member.dto.MemberResponse;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    //private final PasswordEncoder passwordEncoder;
    private final Long memberId = 1L;

    @Override
    public MemberResponse get() {
        Member member = getMember();
        return MemberResponse.builder()
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
                .build();
    }

}
