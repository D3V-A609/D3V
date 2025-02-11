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

    @Override
    @Transactional
    public void sendEmailCode(EmailRequest emailRequest) {
        checkEmailDuplication(emailRequest.email());

        String code = codeGenerator.generateCode();
        String text = emailSender.buildTextForVerificationCode(EmailTemplate.EMAIL_VERIFICATION_CONTENT, code);

        emailSender.sendVerificationCode(emailRequest.email(), EmailTemplate.EMAIL_VERIFICATION_SUBJECT, text);
        verificationCodeCacheRepository.save(VerificationCodeCache.builder()
                .email(emailRequest.email())
                .code(code)
                .verified(false)
                .createdAt(LocalDateTime.now())
                .build());
    }

    @Override
    @Transactional
    public void verifyEmailCode(EmailVerificationRequest emailVerificationRequest) {
        VerificationCodeCache verificationCodeCache = verificationCodeCacheRepository.findValidCode(
                        emailVerificationRequest.email())
                .orElseThrow(() -> new IllegalArgumentException("인증 코드가 만료되었습니다."));

        if (!verificationCodeCache.getCode().equals(emailVerificationRequest.code())) {
            throw new IllegalArgumentException("인증 코드가 일치하지 않습니다.");
        } else {
            verificationCodeCache.verify();
            verificationCodeCacheRepository.save(verificationCodeCache);
        }
    }

    @Override
    @Transactional
    public void sendEmailPassword(EmailRequest emailRequest) {
        Member member = memberRepository.findByEmail(emailRequest.email())
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가진 사용자가 존재하지 않습니다."));

        String password = codeGenerator.generateCode();
        String text = emailSender.buildTextForVerificationCode(EmailTemplate.EMAIL_PASSWORD_CONTENT, password);

        emailSender.sendVerificationCode(emailRequest.email(), EmailTemplate.EMAIL_PASSWORD_SUBJECT, text);

        //member.updatePassword(passwordEncoder.encode(password));

        memberRepository.save(member);
    }
}
