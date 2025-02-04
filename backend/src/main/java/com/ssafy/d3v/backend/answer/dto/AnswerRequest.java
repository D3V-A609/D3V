package com.ssafy.d3v.backend.answer.dto;

import com.ssafy.d3v.backend.common.AccessLevel;

public record AnswerRequest(long memberId,
                            String content, AccessLevel accessLevel) {
}
