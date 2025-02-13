package com.ssafy.d3v.backend.bookmark.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.d3v.backend.bookmark.entity.Bookmark;
import java.util.List;
import lombok.Builder;

@Builder
public record BookmarkResponse(
        @JsonProperty("bookmarks")
        List<BookmarkDto> bookmarks
) {
    @Builder
    public record BookmarkDto(
            @JsonProperty("bookmarkId")
            Long id,

            String name,

            @JsonProperty("accessLevel")
            String accessLevel,

            @JsonProperty("questionCount")
            int questionCount
    ) {
        public static BookmarkDto from(Bookmark bookmark, int questionCount) {
            return BookmarkDto.builder()
                    .id(bookmark.getId())
                    .name(bookmark.getName())
                    .accessLevel(bookmark.getAccessLevel().toString())
                    .questionCount(questionCount)
                    .build();
        }
    }
}