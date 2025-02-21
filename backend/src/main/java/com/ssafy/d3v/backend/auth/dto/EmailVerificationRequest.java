package com.ssafy.d3v.backend.auth.dto;

public record EmailVerificationRequest(String email, String code) {
}
