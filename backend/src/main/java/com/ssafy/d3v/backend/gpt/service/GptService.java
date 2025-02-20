package com.ssafy.d3v.backend.gpt.service;

import com.ssafy.d3v.backend.question.entity.Question;
import com.ssafy.d3v.backend.question.repository.QuestionRepository;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class GptService {

    private final QuestionRepository questionRepository;

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    public String getGptResponse(Long questionId, String answer) {
        Question quesiton = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("getGptResponse: questionId에 해당하는 질문이 없습니다."));

        RestTemplate restTemplate = new RestTemplate();

        // 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        // 프롬프트 생성 (한국어 및 마크다운 형식)
        String userPrompt = String.format(
                "다음은 사용자가 제공한 질문과 답변입니다:\n\n" +
                        "질문: %s\n" +
                        "답변: %s\n\n" +
                        "당신은 기술 면접관의 입장에서 위 내용을 평가해주세요. 아래 항목에 따라 답변하세요:\n" +
                        "1. 칭찬할 점\n" +
                        "2. 부족한 점\n" +
                        "3. 피드백을 반영한 추천 답변\n\n" +
                        "결과는 마크다운 형식으로 이모지를 사용해서 깔끔하게 정리해서 제공해주세요.",
                quesiton.getContent(), answer
        );

        // 요청 바디 생성 (한국어 메시지 포함)
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4o");
        requestBody.put("messages", new Object[]{
                Map.of("role", "system", "content", "당신은 유능한 기술 면접관입니다. 친절하지만 냉철하게 질문과 답변을 평가하고 피드백을 제공합니다."
                        + " 그리고 항상 친절하고 존댓말을 사용해서 답변해줍니다."),
                Map.of("role", "user", "content", userPrompt)
        });
        requestBody.put("max_tokens", 500);
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // API 호출
        ResponseEntity<Map> response = restTemplate.exchange(
                OPENAI_API_URL,
                HttpMethod.POST,
                entity,
                Map.class
        );

        // 응답 처리
        Map<String, Object> firstChoice = ((Map<String, Object>) ((java.util.List<?>) response.getBody()
                .get("choices")).get(0));
        Map<String, Object> message = (Map<String, Object>) firstChoice.get("message");

        return (String) message.get("content");
    }
}

