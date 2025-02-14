package com.ssafy.d3v.backend.member.service;

import com.ssafy.d3v.backend.member.dto.MemberReqDto;
import com.ssafy.d3v.backend.member.dto.MemberRequest;
import com.ssafy.d3v.backend.member.dto.MemberResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    MemberResponse get(long memberId);

    MemberResponse update(MemberRequest memberRequest, MultipartFile profileImage);

    void delete();

    ResponseEntity<?> signUp(MemberReqDto.SignUp signUp, MultipartFile profileImage);

    ResponseEntity<?> login(HttpServletResponse response, MemberReqDto.Login login);

    ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response);
}
