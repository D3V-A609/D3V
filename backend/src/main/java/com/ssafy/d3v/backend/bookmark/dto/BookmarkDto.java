package com.ssafy.d3v.backend.bookmark.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.d3v.backend.bookmark.entity.Bookmark;
import lombok.Builder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public record BookmarkDto(
        @JsonProperty("bookmarkId")
        Long id,

        String name,

        @JsonProperty("accessLevel")
        String accessLevel,

        @JsonProperty("questionCount")
        Integer questionCount
) {
    public static BookmarkDto from(Bookmark bookmark) {
        return BookmarkDto.builder()
                .id(bookmark.getId())
                .name(bookmark.getName())
                .accessLevel(bookmark.getAccessLevel().toString())
                .build();
    }

    public static BookmarkDto from(Bookmark bookmark, int questionCount) {
        return BookmarkDto.builder()
                .id(bookmark.getId())
                .name(bookmark.getName())
                .accessLevel(bookmark.getAccessLevel().toString())
                .questionCount(questionCount)
                .build();
    }
}
