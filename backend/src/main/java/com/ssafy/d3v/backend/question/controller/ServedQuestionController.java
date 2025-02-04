package com.ssafy.d3v.backend.question.controller;

import com.ssafy.d3v.backend.question.dto.ServedQuestionCreateRequest;
import com.ssafy.d3v.backend.question.dto.ServedQuestionUpdateRequest;
import com.ssafy.d3v.backend.question.service.ServedQuestionService;
import com.ssafy.d3v.backend.question.dto.ServedQuestionDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/servedquestion")
@RequiredArgsConstructor
@Tag(name = "제안된 질문", description = "제안된 질문 관련 API")
public class ServedQuestionController {

    private final ServedQuestionService servedQuestionService;

    @GetMapping
    @Operation(summary = "제안된 질문 전체 조회", description = "모든 제안된 질문을 조회합니다.")
    public ResponseEntity<List<ServedQuestionDto>> getAllServedQuestions() {
        return ResponseEntity.ok(servedQuestionService.getAllServedQuestions());
    }

    @GetMapping("/{id}")
    @Operation(summary = "제안된 질문 하나 조회", description = "주어진 제안된 질문 ID에 해당하는 제안된 질문을 조회합니다.")
    public ResponseEntity<ServedQuestionDto> getServedQuestion(@PathVariable Long id) {
        return ResponseEntity.ok(servedQuestionService.getServedQuestion(id));
    }

    @PostMapping
    @Operation(summary = "제안된 질문 생성", description = "제안된 질문을 생성합니다.")
    public ResponseEntity<ServedQuestionDto> createServedQuestion(@RequestBody ServedQuestionCreateRequest servedQuestionCreateRequest) {
        // false가 isDaily값이라서 외부 API 호출로는 isDaily값을 true로 create 하는 경우가 없기 때문에 고정값 false를 박아놨습니다.
        return ResponseEntity.status(HttpStatus.CREATED).body(servedQuestionService.createServedQuestion(
                servedQuestionCreateRequest, false));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "제안된 질문 수정", description = "제안된 질문을 수정합니다. {isSolved, isDaily, servedAt} 수정 가능")
    public ResponseEntity<ServedQuestionDto> updateServedQuestion(
            @PathVariable Long id,
            @RequestBody ServedQuestionUpdateRequest servedQuestionUpdateRequest) {
        return ResponseEntity.ok(servedQuestionService.updateServedQuestion(id, servedQuestionUpdateRequest));
    }

    @GetMapping("/member/{memberId}")
    @Operation(summary = "특정 멤버의 제안된 질문 전체 조회", description = "주어진 멤버 ID에 해당하는 제안된 질문 전체를 조회합니다. 내 질문을 조회할 때도 사용")
    public ResponseEntity<List<ServedQuestionDto>> getServedQuestionsByMember(@PathVariable Long memberId) {
        List<ServedQuestionDto> servedQuestions = servedQuestionService.getServedQuestionsByMemberId(memberId);
        return ResponseEntity.ok(servedQuestions);
    }
}
