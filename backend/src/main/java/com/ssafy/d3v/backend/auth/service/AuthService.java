package com.ssafy.d3v.backend.auth.service;

import com.ssafy.d3v.backend.auth.dto.EmailRequest;
import com.ssafy.d3v.backend.auth.dto.EmailVerificationRequest;
import com.ssafy.d3v.backend.member.dto.UserTestReqDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    void checkNicknameDuplication(String nickname);

    void checkEmailDuplication(String email);

    void sendEmailCode(EmailRequest emailRequest);

    void verifyEmailCode(EmailVerificationRequest emailVerificationRequest);

    void sendEmailPassword(EmailRequest emailRequest);

    ResponseEntity<?> getSocialType(String email);
    
    ResponseEntity<?> reissue(UserTestReqDto.Reissue reissue);
}
