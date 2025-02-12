package com.ssafy.d3v.backend.answer.dto;

import com.ssafy.d3v.backend.common.util.AccessLevel;

public record AnswerRequest(long questionId, long memberId,
                            String content, AccessLevel accessLevel, boolean isSolved) {
}