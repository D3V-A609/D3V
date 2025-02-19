package com.ssafy.d3v.backend.member.controller;

import com.ssafy.d3v.backend.member.dto.HistoryResponse;
import com.ssafy.d3v.backend.member.service.HistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/history")
@Tag(name = "히스토리", description = "히스토리 API")
public class HistoryController {
    private final HistoryService historyService;

    @Operation(summary = "히스토리 조회")
    @GetMapping("/{member_id}")
    public ResponseEntity<List<HistoryResponse>> getHistory(@PathVariable(value = "member_id") Long memberId) {
        return ResponseEntity.ok().body(historyService.getHistory(memberId));
    }

    @Operation(summary = "특정 멤버의 오늘 스트릭 카운트 조회")
    @GetMapping("/streak/{member_id}")
    public ResponseEntity<Integer> getStreak(@PathVariable(value = "member_id") Long memberId) {
        return ResponseEntity.ok().body(historyService.getCountByMemberIdAndDate(memberId));
    }
}
