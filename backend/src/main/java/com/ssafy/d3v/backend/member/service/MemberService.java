package com.ssafy.d3v.backend.member.service;

import com.ssafy.d3v.backend.member.dto.MemberRequest;
import com.ssafy.d3v.backend.member.dto.MemberResponse;
import com.ssafy.d3v.backend.member.dto.UserTestReqDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    MemberResponse get(long memberId);

    MemberResponse update(MemberRequest memberRequest, MultipartFile profileImage);

    void delete();

    ResponseEntity<?> signUp(UserTestReqDto.SignUp signUp, MultipartFile profileImage);

    ResponseEntity<?> login(UserTestReqDto.Login login);

    ResponseEntity<?> logout(UserTestReqDto.Logout logout);
}
