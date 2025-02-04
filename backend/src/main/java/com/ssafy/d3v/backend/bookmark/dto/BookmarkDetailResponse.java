package com.ssafy.d3v.backend.bookmark.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookmarkDetailResponse {
    private Long id;
    private String name;
    private String description;
    private String accessLevel;
    private List<QuestionInfo> questions;
}
