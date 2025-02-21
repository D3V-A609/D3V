package com.ssafy.d3v.backend.gpt.dto;

public record GptRequest(
        Long questionId,
        String answer
) {
}
