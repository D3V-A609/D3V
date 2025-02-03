package com.ssafy.d3v.backend.answer.dto;

public record StandardAnswerResponse(long questionId, String content, String standardAnswer, boolean isSolved) {
}
