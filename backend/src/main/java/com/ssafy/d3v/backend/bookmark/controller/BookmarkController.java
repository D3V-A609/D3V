package com.ssafy.d3v.backend.bookmark.controller;

import com.ssafy.d3v.backend.bookmark.dto.BookmarkCreateDto;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkDetailResponse;
import com.ssafy.d3v.backend.bookmark.dto.BookmarkResponse;
import com.ssafy.d3v.backend.bookmark.service.BookmarkServiceImpl;
import com.ssafy.d3v.backend.common.dto.BaseResponse;
import com.ssafy.d3v.backend.common.message.SuccessMessages;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "북마크", description = "북마크 API")
@RequestMapping("/api/bookmark")
public class BookmarkController {

    private final BookmarkServiceImpl bookmarkService;

    // 북마크 생성
    @Operation(summary = "북마크 생성", description = "북마크 이름, 설명, 접근권한으로 생성")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody BookmarkCreateDto request) {
        bookmarkService.create(request);
        BaseResponse response = BaseResponse.builder()
                .message(SuccessMessages.SUCCESS_BOOKMARK_CREATE.getMessage())
                .build();
        return ResponseEntity.ok(response);
    }


    // 북마크 수정
    @Operation(summary = "북마크 수정", description = "북마크 이름, 설명, 접근권한 수정")
    @PatchMapping("/{bookmarkId}")
    public ResponseEntity<?> update(
            @PathVariable("bookmarkId") Long bookmarkId,
            @RequestBody BookmarkCreateDto request
    ) {
        bookmarkService.update(bookmarkId, request);

        BaseResponse response = BaseResponse.builder()
                .message(SuccessMessages.SUCCESS_BOOKMARK_UPDATE.getMessage())
                .build();
        return ResponseEntity.ok(response);
    }

    // 북마크 삭제
    @Operation(summary = "북마크 삭제", description = "북마크 id로 삭제")
    @DeleteMapping("/{bookmarkId}")
    public ResponseEntity<?> delete(@PathVariable("bookmarkId") Long bookmarkId) {
        bookmarkService.delete(bookmarkId);
        BaseResponse response = BaseResponse.builder()
                .message(SuccessMessages.SUCCESS_BOOKMARK_DELETE.getMessage())
                .build();
        return ResponseEntity.ok(response);
    }

    // 북마크 단일 조회
    @Operation(summary = "단일 북마크 조회", description = "북마크 id로 조회, 해당 북마크에 있는 질문 리스트 재공")
    @GetMapping("/{bookmarkId}")
    public ResponseEntity<?> getBookmark(@PathVariable("bookmarkId") Long bookmarkId) {
        BookmarkDetailResponse response = bookmarkService.get(bookmarkId);
        return ResponseEntity.ok(response);
    }

    // 북마크 전체 조회
    @Operation(summary = "전체 북마크 조회", description = "북마크 id로 조회, 해당 북마크에 있는 질문 리스트 재공")
    @GetMapping("/member/{memberId}")
    public ResponseEntity<?> getAllBookmarks(@PathVariable("memberId") Long memberId) {
        BookmarkResponse response = bookmarkService.getAll(memberId);
        return ResponseEntity.ok(response);
    }

    // 북마크에 질문 추가

    // 북마크에 질문 삭제

}



