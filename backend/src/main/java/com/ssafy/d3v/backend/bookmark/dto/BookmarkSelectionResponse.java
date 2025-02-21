package com.ssafy.d3v.backend.bookmark.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.d3v.backend.bookmark.entity.Bookmark;
import java.util.List;
import lombok.Builder;

@Builder
public record BookmarkSelectionResponse(
        @JsonProperty("bookmarks")
        List<BookmarkDto> bookmarks,

        @JsonProperty("selectedBookmarks")
        List<Long> selectedBookmarks
) {
    public static BookmarkSelectionResponse from(List<Bookmark> bookmarks, List<Long> selectedBookmarks) {
        List<BookmarkDto> bookmarkDtos = bookmarks.stream()
                .map(BookmarkDto::from)
                .toList();

        return BookmarkSelectionResponse.builder()
                .bookmarks(bookmarkDtos)
                .selectedBookmarks(selectedBookmarks)
                .build();
    }
}
