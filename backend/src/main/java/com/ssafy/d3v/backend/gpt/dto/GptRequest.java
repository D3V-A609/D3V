package com.ssafy.d3v.backend.gpt.dto;

public record GptRequest(
        String question,
        String answer
) {
}
