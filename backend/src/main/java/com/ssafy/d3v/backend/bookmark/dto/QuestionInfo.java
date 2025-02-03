package com.ssafy.d3v.backend.bookmark.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionInfo {
    private Long id;
    private String content;
}
