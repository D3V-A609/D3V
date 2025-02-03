package com.ssafy.d3v.backend.bookmark.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookmarkResponse {
    @JsonProperty("bookmarks")
    private List<BookmarkDto> bookmarks;

    @Getter
    @Builder
    public static class BookmarkDto {
        @JsonProperty("bookmarkId")
        private Long id;

        private String name;

        @JsonProperty("access_level")
        private String accessLevel;

        @JsonProperty("question_count")
        private int questionCount;
    }
}