package com.ssafy.d3v.backend.auth.controller;

import com.ssafy.d3v.backend.auth.dto.EmailRequest;
import com.ssafy.d3v.backend.auth.dto.EmailVerificationRequest;
import com.ssafy.d3v.backend.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Tag(name = "인증", description = "인증 API")
public class AuthController {
    private final AuthService authService;

    @Operation(summary = "닉네임 중복 확인")
    @GetMapping("/nickname/duplication")
    public ResponseEntity<String> checkNicknameDuplication(@RequestParam("nickname") String nickname) {
        authService.checkNicknameDuplication(nickname);
        return ResponseEntity.ok().body("사용 가능한 닉네임 입니다.");
    }

    @Operation(summary = "이메일 중복 확인")
    @GetMapping("/email/duplication")
    public ResponseEntity<String> checkEmailDuplication(@RequestParam("email") String email) {
        authService.checkEmailDuplication(email);
        return ResponseEntity.ok().body("사용 가능한 이메일 입니다.");
    }
}
