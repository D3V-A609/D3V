package com.ssafy.d3v.backend.bookmark.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.d3v.backend.bookmark.entity.Bookmark;
import java.util.List;
import lombok.Builder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public record BookmarkResponse(
        @JsonProperty("bookmarks")
        List<BookmarkDto> bookmarks,

        @JsonProperty("selectedBookmarks")
        List<Long> selectedBookmarks
) {
    public static BookmarkResponse from(List<Bookmark> bookmarks) {
        List<BookmarkDto> bookmarkDtos = bookmarks.stream()
                .map(bookmark -> BookmarkDto.from(bookmark, bookmark.getBookmarkQuestions().size()))
                .toList();

        return BookmarkResponse.builder()
                .bookmarks(bookmarkDtos)
                .build();
    }

    public static BookmarkResponse from(List<Bookmark> bookmarks, List<Long> selectedBookmarks) {
        List<BookmarkDto> bookmarkDtos = bookmarks.stream()
                .map(BookmarkDto::from)
                .toList();

        return BookmarkResponse.builder()
                .bookmarks(bookmarkDtos)
                .selectedBookmarks(selectedBookmarks)
                .build();
    }
}
