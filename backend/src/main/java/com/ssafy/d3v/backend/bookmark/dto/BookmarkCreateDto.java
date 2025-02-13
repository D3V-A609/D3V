package com.ssafy.d3v.backend.bookmark.dto;

import com.ssafy.d3v.backend.common.util.AccessLevel;
import com.ssafy.d3v.backend.common.validation.annotation.AccessLevelValid;

public record BookmarkCreateDto(
        String name,
        String description,
        @AccessLevelValid(enumClass = AccessLevel.class, message = "access level 값이 올바르지 않습니다.")
        String accessLevel
) {
}