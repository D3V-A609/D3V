package com.ssafy.d3v.backend.question.entity;

import com.ssafy.d3v.backend.question.dto.QuestionDto;
import java.io.Serializable;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("TopQuestionCache")
@Getter
@Builder
public class TopQuestionCache implements Serializable {

    @Id
    private String id; // Key: jobRole-month (e.g., "DEVELOPER-2025-01")

    private String jobRole; // 직무 이름
    private String month; // "yyyy-MM" 형식의 월
    private List<QuestionDto> questions; // Top 10 질문 목록

}
