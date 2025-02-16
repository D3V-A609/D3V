package com.ssafy.d3v.backend.question.controller;

import com.ssafy.d3v.backend.question.dto.JobDto;
import com.ssafy.d3v.backend.question.dto.QuestionDto;
import com.ssafy.d3v.backend.question.dto.QuestionResponse;
import com.ssafy.d3v.backend.question.dto.SkillDto;
import com.ssafy.d3v.backend.question.dto.Top10QuestionResponse;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.service.QuestionService;
import com.ssafy.d3v.backend.question.service.ServedQuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
@Tag(name = "질문", description = "질문 관련 API")
public class QuestionController {

    private final QuestionService questionService;
    private final ServedQuestionService servedQuestionService;

    @Operation(summary = "질문 카테고리 조회", description = "전체 질문 중 주어진 필터, 정렬, 페이지, 키워드로 검색한 질문들을 조회합니다.")
    @GetMapping
    public ResponseEntity<Page<QuestionResponse>> getQuestions(
            @RequestParam(required = false) List<String> jobs, // job 필터
            @RequestParam(required = false) List<String> skills, // skill 필터
            @RequestParam(required = false) String solved, // solved 필터
            @RequestParam(defaultValue = "desc") String order, // 정렬 순서 (기본값: desc)
            @RequestParam(defaultValue = "acnt") String sort, // 정렬 기준 (기본값: acnt)
            @RequestParam(defaultValue = "0") int page, // 페이지 번호 (기본값: 0)
            @RequestParam(defaultValue = "15") int size, // 페이지 크기 (기본값: 15)
            @RequestParam(required = false) String keyword // 키워드 검색
    ) {
        return ResponseEntity.ok(questionService.getQuestions(jobs, skills, solved, order, sort, page, size, keyword)
                .map(QuestionDto::from).map(this::getQuestionResponse));
    }

    @Operation(summary = "질문 상세 조회", description = "주어진 질문 ID에 해당하는 질문의 상세 정보를 조회합니다.")
    @GetMapping("/{question_id}")
    public ResponseEntity<QuestionResponse> getQuestionDetail(
            @Parameter(description = "조회할 질문의 ID") @PathVariable("question_id") Long questionId) {
        Question question = questionService.getById(questionId);
        return ResponseEntity.ok(getQuestionResponse(QuestionDto.from(question)));
    }

    @GetMapping("/daily")
    @Operation(summary = "데일리 질문 조회", description = "3개 데일리 질문을 조회합니다. 없을 경우 새로 생성해서 제공합니다.")
    public ResponseEntity<List<QuestionResponse>> getDailyQuestions() {
        return ResponseEntity.ok(getListResponse(questionService.getDailyQuestions()));
    }

    @GetMapping("/top10")
    @Operation(summary = "월간 TOP10 질문을 조회합니다", description = "선택한 직무에 대한 저번 달의 답변수 TOP10 질문을 조회합니다.")
    public ResponseEntity<List<Top10QuestionResponse>> getTop10Questions(@RequestParam("month") String month,
                                                                         @RequestParam("job") String job) {
        return ResponseEntity.ok(questionService.getTop10Questions(month, job)
                .stream().map(this::getTop10QuestionResponse).toList());
    }

    private List<QuestionResponse> getListResponse(List<QuestionDto> questions) {
        return questions.stream()
                .map(this::getQuestionResponse)
                .toList();
    }

    private QuestionResponse getQuestionResponse(QuestionDto question) {
        String solved = servedQuestionService.getIsSolvedStatus(question.id());
        List<SkillDto> skills = questionService.getSkillsByQuestionId(question.id());
        List<JobDto> jobs = questionService.getJobsByQuestionId(question.id());
        return QuestionResponse.of(question, solved, skills, jobs);
    }

    private Top10QuestionResponse getTop10QuestionResponse(QuestionDto question) {
        List<SkillDto> skills = questionService.getSkillsByQuestionId(question.id());
        List<JobDto> jobs = questionService.getJobsByQuestionId(question.id());
        return Top10QuestionResponse.of(question, skills, jobs);
    }
}

