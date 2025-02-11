package com.ssafy.d3v.backend.member.service;

import com.ssafy.d3v.backend.member.dto.MemberRequest;
import com.ssafy.d3v.backend.member.dto.MemberResponse;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    MemberResponse get();

    MemberResponse update(MemberRequest memberRequest, MultipartFile profileImage);

    void delete();

}
