package com.ssafy.d3v.backend.member.controller;

import com.ssafy.d3v.backend.member.dto.MemberRequest;
import com.ssafy.d3v.backend.member.dto.MemberResponse;
import com.ssafy.d3v.backend.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
@Tag(name = "회원", description = "회원 API")
public class MemberController {
    private final MemberService memberService;

    @Operation(summary = "회원 정보 조회")
    @GetMapping
    public ResponseEntity<MemberResponse> get() {
        return ResponseEntity.ok().body(memberService.get());
    }

    @Operation(summary = "회원 정보 수정")
    @PatchMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MemberResponse> update(@ModelAttribute MemberRequest memberRequest,
                                                 @RequestParam(value = "profile_image", required = false) MultipartFile profileImage) {
        return ResponseEntity.ok().body(memberService.update(memberRequest, profileImage));
    }

}
