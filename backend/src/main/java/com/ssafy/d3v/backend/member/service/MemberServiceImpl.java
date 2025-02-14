package com.ssafy.d3v.backend.member.service;

import com.ssafy.d3v.backend.common.util.S3ImageUploader;
import com.ssafy.d3v.backend.member.dto.MemberRequest;
import com.ssafy.d3v.backend.member.dto.MemberResponse;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final S3ImageUploader s3ImageUploader;
    private final PasswordEncoder passwordEncoder;
    private final Long memberId = 1L;

    @Override
    public MemberResponse get(long memberId) {
        Member member = getMember(memberId);
        return MemberResponse.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .profileImg(member.getProfileImg())
                .githubUrl(member.getGithubUrl())
                .maxStreak(member.getMaxStreak())
                .ongoingStreak(member.getOngoingStreak())
                .providerType(member.getProviderType().name())
                .createdAt(member.getCreatedAt())
                .favoriteJob(member.getFavoriteJob())
                .build();
    }

    @Override
    @Transactional
    public MemberResponse update(MemberRequest memberRequest, MultipartFile profileImage) {
        Member member = getMember(memberId);

        if (!profileImage.isEmpty()) {
            s3ImageUploader.deleteImageFromS3(member.getProfileImg());
            String profileImg = s3ImageUploader.upload(profileImage);
            member.setProfileImg(profileImg);
        }

        Member updated = memberRepository.saveAndFlush(member.toBuilder()
                .nickname(memberRequest.nickname())
                .password(passwordEncoder.encode(memberRequest.password()))
                .githubUrl(memberRequest.githubUrl())
                .favoriteJob(memberRequest.favoriteJob())
                .build());

        return MemberResponse.builder()
                .memberId(updated.getId())
                .nickname(updated.getNickname())
                .email(updated.getEmail())
                .profileImg(updated.getProfileImg())
                .githubUrl(updated.getGithubUrl())
                .maxStreak(updated.getMaxStreak())
                .ongoingStreak(updated.getOngoingStreak())
                .providerType(updated.getProviderType().name())
                .createdAt(updated.getCreatedAt())
                .favoriteJob(updated.getFavoriteJob())
                .build();
    }

    @Override
    @Transactional
    public void delete() {
        Member member = getMember(memberId);
        member.delete();
        memberRepository.saveAndFlush(member);
    }

    private Member getMember(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException("해당 회원이 존재하지 않습니다. 회원 ID: " + memberId));
    }
}
