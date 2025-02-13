package com.ssafy.d3v.backend.question.controller;

import com.ssafy.d3v.backend.question.dto.QuestionDto;
import com.ssafy.d3v.backend.question.dto.QuestionResponse;
import com.ssafy.d3v.backend.question.entity.Job;
import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.entity.Skill;
import com.ssafy.d3v.backend.question.service.QuestionService;
import com.ssafy.d3v.backend.question.service.ServedQuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        Page<QuestionResponse> questions = questionService.getQuestions(
                jobs,
                skills,
                solved,
                order,
                sort,
                page,
                size,
                keyword
        ).map(QuestionDto::from).map(this::createQuestionResponse);
        return ResponseEntity.ok(questions);
    }

    @Operation(summary = "질문 상세 조회", description = "주어진 질문 ID에 해당하는 질문의 상세 정보를 조회합니다.")
    @GetMapping("/{question_id}")
    public ResponseEntity<QuestionResponse> getQuestionDetail(
            @Parameter(description = "조회할 질문의 ID") @PathVariable("question_id") Long questionId) {
        Question question = questionService.getById(questionId);
        return ResponseEntity.ok(createQuestionResponse(QuestionDto.from(question)));
    }

//    @GetMapping("/all")
//    @Operation(summary = "질문 전체 조회", description = "전체 질문을 페이징 조회합니다")
//    public ResponseEntity<Page<QuestionResponse>> getAllQuestions(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "15") int size) {
//        Page<Question> questionsPage = questionService.getAllQuestions(page, size);
//
//        Page<QuestionResponse> questionResponsesPage = questionsPage.map(this::createQuestionResponse);
//
//        return ResponseEntity.ok(questionResponsesPage);
//    }

    @GetMapping("/daily")
    @Operation(summary = "데일리 질문 조회", description = "3개 데일리 질문을 조회합니다. 없을 경우 새로 생성해서 제공합니다.")
    public ResponseEntity<List<QuestionResponse>> getDailyQuestions() {
        return getListResponseEntity(questionService.getDailyQuestions());
    }

    // /api/question/top10?month={month}&job={job}
    @GetMapping("/top10")
    @Operation(summary = "월간 TOP10 질문을 조회합니다", description = "선택한 직무에 대한 저번 달의 답변수 TOP10 질문을 조회합니다.")
    public ResponseEntity<List<QuestionResponse>> getTop10Questions(@RequestParam("month") String month,
                                                                    @RequestParam("job") String job) {
        return getListResponseEntity(questionService.getTop10Questions(month, job));
    }

    private ResponseEntity<List<QuestionResponse>> getListResponseEntity(List<QuestionDto> questions) {
        List<QuestionResponse> questionResponseList = questions.stream()
                .map(this::createQuestionResponse)
                .toList();
        return ResponseEntity.ok(questionResponseList);
    }

    private QuestionResponse createQuestionResponse(QuestionDto question) {
        String solved = servedQuestionService.getIsSolvedStatus(question.id());
        List<Skill> skills = questionService.getSkillsByQuestionId(question.id());
        List<Job> jobs = questionService.getJobsByQuestionId(question.id());
        return QuestionResponse.from(question, solved, skills, jobs);
    }
}

