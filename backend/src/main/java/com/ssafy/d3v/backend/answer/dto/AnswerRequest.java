package com.ssafy.d3v.backend.answer.dto;

public record AnswerRequest(long questionId, long memberId,
                            String content, String accessLevel, boolean isSolved) {
}