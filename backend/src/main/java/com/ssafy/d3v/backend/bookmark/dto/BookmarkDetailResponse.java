package com.ssafy.d3v.backend.bookmark.dto;

import com.ssafy.d3v.backend.bookmark.entity.Bookmark;
import java.util.List;
import lombok.Builder;

@Builder
public record BookmarkDetailResponse(
        Long bookmarkId,
        String name,
        String description,
        String accessLevel,
        List<QuestionInfo> questions
) {
    public static BookmarkDetailResponse from(Bookmark bookmark, List<QuestionInfo> questions) {
        return BookmarkDetailResponse.builder()
                .bookmarkId(bookmark.getId())
                .name(bookmark.getName())
                .description(bookmark.getDescription())
                .accessLevel(bookmark.getAccessLevel().toString())
                .questions(questions)
                .build();
    }
}
