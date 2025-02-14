package com.ssafy.d3v.backend.auth.service;

import static com.ssafy.d3v.backend.common.jwt.JwtTokenProvider.getRefreshTokenExpireTimeCookie;
import static com.ssafy.d3v.backend.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN;

import com.ssafy.d3v.backend.auth.dto.EmailRequest;
import com.ssafy.d3v.backend.auth.dto.EmailVerificationRequest;
import com.ssafy.d3v.backend.auth.entity.VerificationCodeCache;
import com.ssafy.d3v.backend.auth.exception.DuplicateResourceException;
import com.ssafy.d3v.backend.auth.repository.VerificationCodeCacheRepository;
import com.ssafy.d3v.backend.common.constant.EmailTemplate;
import com.ssafy.d3v.backend.common.jwt.JwtTokenProvider;
import com.ssafy.d3v.backend.common.jwt.TokenInfo;
import com.ssafy.d3v.backend.common.util.CodeGenerator;
import com.ssafy.d3v.backend.common.util.CookieUtil;
import com.ssafy.d3v.backend.common.util.EmailSender;
import com.ssafy.d3v.backend.common.util.HeaderUtil;
import com.ssafy.d3v.backend.common.util.Response;
import com.ssafy.d3v.backend.member.entity.Member;
import com.ssafy.d3v.backend.member.repository.MemberRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final MemberRepository memberRepository;
    private final VerificationCodeCacheRepository verificationCodeCacheRepository;
    private final EmailSender emailSender;
    private final CodeGenerator codeGenerator;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate<String, String> redisTemplate;
    private final PasswordEncoder passwordEncoder;

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
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가진 유저가 존재하지 않습니다."));

        String password = codeGenerator.generateCode();
        String text = emailSender.buildTextForVerificationCode(EmailTemplate.EMAIL_PASSWORD_CONTENT, password);

        emailSender.sendVerificationCode(emailRequest.email(), EmailTemplate.EMAIL_PASSWORD_SUBJECT, text);

        member.setPassword(passwordEncoder.encode(password));

        memberRepository.save(member);
    }

    @Override
    public ResponseEntity<?> getSocialType(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가진 유저가 존재하지 않습니다."));

        return Response.makeResponse(HttpStatus.OK, "소셜 가입 여부 확인 성공", 1, member.getProviderType());
    }

    @Override
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

        // 1. 쿠키에서 Refresh Token 가져오기
        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN).map(Cookie::getValue).orElse(null);

        // 2. Refresh Token 검증
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            return Response.badRequest("Refresh Token 정보가 유효하지 않습니다.");
        }
        // 1. Request Header 에서 Access Token 추출
        String accessToken = HeaderUtil.getAccessToken(request);

        // 5. Access Token 에서 User email 을 가져옵니다.
        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);

        // 6. Redis 에서 User email 을 기반으로 저장된 Refresh Token 값을 가져옵니다.
        String redisRefreshToken = redisTemplate.opsForValue().get("RT:" + authentication.getName());
        // (추가) 로그아웃되어 Redis 에 RefreshToken 이 존재하지 않는 경우 처리
        if (ObjectUtils.isEmpty(redisRefreshToken)) {
            return Response.badRequest("잘못된 요청입니다.");
        }
        if (!redisRefreshToken.equals(refreshToken)) {
            return Response.badRequest("Refresh Token 정보가 일치하지 않습니다.");
        }

        // 7. 새로운 토큰 생성
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        // 8. RefreshToken Redis 업데이트
        redisTemplate.opsForValue().set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(),
                tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        // 9. 쿠키에 Refresh Token 저장
        CookieUtil.addCookie(response, REFRESH_TOKEN, tokenInfo.getRefreshToken(),
                getRefreshTokenExpireTimeCookie());

        return Response.makeResponse(HttpStatus.OK, "토큰 재발급을 성공하였습니다.", 0, tokenInfo);
    }
}
