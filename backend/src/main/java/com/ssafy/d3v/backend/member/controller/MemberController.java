package com.ssafy.d3v.backend.member.controller;

import com.ssafy.d3v.backend.common.util.Response;
import com.ssafy.d3v.backend.member.dto.MemberRequest;
import com.ssafy.d3v.backend.member.dto.MemberResponse;
import com.ssafy.d3v.backend.member.dto.UserTestReqDto;
import com.ssafy.d3v.backend.member.dto.UserTestResDto;
import com.ssafy.d3v.backend.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
@Tag(name = "회원", description = "회원 API")
public class MemberController {
    private final MemberService memberService;

    @Operation(summary = "회원 정보 조회")
    @GetMapping("/{member_id}")
    public ResponseEntity<MemberResponse> get(@PathVariable("member_id") Long memberId) {
        return ResponseEntity.ok().body(memberService.get(memberId));
    }

    @Operation(summary = "회원 정보 수정")
    @PatchMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MemberResponse> update(@ModelAttribute MemberRequest memberRequest,
                                                 @RequestParam(value = "profile_image", required = false) MultipartFile profileImage) {
        return ResponseEntity.ok().body(memberService.update(memberRequest, profileImage));
    }

    @Operation(summary = "회원 탈퇴")
    @DeleteMapping
    public ResponseEntity delete() {
        memberService.delete();
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "회원가입 API", responses = {
            @ApiResponse(responseCode = "200", description = "회원가입 성공"),
            @ApiResponse(responseCode = "400", description = "회원가입 실패"),
    })

    @PostMapping("")
    public ResponseEntity<?> signUp(@RequestBody @Validated UserTestReqDto.SignUp signUp, Errors errors) {
        // validation check
        log.info(signUp.toString());
        if (errors.hasErrors()) {
            log.error("signUp 에러 : {}", errors.getAllErrors());
            return Response.badRequest("회원가입에 실패하였습니다.");
        }

        return memberService.signUp(signUp);
    }


    @Operation(summary = "로그인 API", responses = {
            @ApiResponse(responseCode = "200", description = "로그인 성공", content = @Content(schema =
            @Schema(implementation = UserTestResDto.UserInfo.class))),
            @ApiResponse(responseCode = "400", description = "로그인 실패"),
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated UserTestReqDto.Login login, Errors errors) {
        // validation  check
        log.info(login.toString());
        if (errors.hasErrors()) {
            log.error("login 에러 : {}", errors.getAllErrors());
            return Response.badRequest("로그인에 실패하였습니다.");
        }

        return memberService.login(login);
    }


    @Operation(summary = "로그아웃 API", responses = {
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(responseCode = "400", description = "로그아웃 실패"),
    })
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody @Validated UserTestReqDto.Logout logout, Errors errors) {
        if (errors.hasErrors()) {
            return Response.badRequest("로그아웃을 실패하였습니다.");
        }
        return memberService.logout(logout);
    }
}
