package com.ssafy.d3v.backend.auth.service;

import com.ssafy.d3v.backend.auth.dto.EmailRequest;
import com.ssafy.d3v.backend.auth.dto.EmailVerificationRequest;

public interface AuthService {
    void checkNicknameDuplication(String nickname);

    void checkEmailDuplication(String email);

}
