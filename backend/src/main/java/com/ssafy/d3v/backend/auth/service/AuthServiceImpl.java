package com.ssafy.d3v.backend.auth.service;

import com.ssafy.d3v.backend.auth.dto.EmailRequest;
import com.ssafy.d3v.backend.auth.dto.EmailVerificationRequest;
import com.ssafy.d3v.backend.auth.entity.VerificationCodeCache;
import com.ssafy.d3v.backend.auth.exception.DuplicateResourceException;
import com.ssafy.d3v.backend.auth.repository.VerificationCodeCacheRepository;
import com.ssafy.d3v.backend.common.constant.EmailTemplate;
import com.ssafy.d3v.backend.common.util.CodeGenerator;
import com.ssafy.d3v.backend.common.util.EmailSender;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final MemberRepository memberRepository;
    private final VerificationCodeCacheRepository verificationCodeCacheRepository;
    private final EmailSender emailSender;
    private final CodeGenerator codeGenerator;
    //private final PasswordEncoder passwordEncoder;

    @Override
    public void checkNicknameDuplication(String nickname) {
        memberRepository.findByNickname(nickname).ifPresent(member -> {
            throw new DuplicateResourceException("이미 사용 중인 닉네임입니다. 닉네임: " + nickname);
        });
    }

    @Override
    public void checkEmailDuplication(String email) {
        memberRepository.findByEmail(email).ifPresent(member -> {
            throw new DuplicateResourceException("이미 사용 중인 이메일입니다. 이메일:" + email);
        });
    }

}
