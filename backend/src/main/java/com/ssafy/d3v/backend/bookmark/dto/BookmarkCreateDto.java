package com.ssafy.d3v.backend.bookmark.dto;

import com.ssafy.d3v.backend.common.AccessLevel;
import com.ssafy.d3v.backend.common.validation.annotation.AccessLevelValid;
import lombok.Getter;

@Getter
public class BookmarkCreateDto {
    private String name;
    private String description;
    @AccessLevelValid(enumClass = AccessLevel.class, message = "access level 값이 올바르지 않습니다.")
    private String accessLevel;
}
