package com.ssafy.d3v.backend.common.dto;

import java.util.List;

public record PagedResponse<T>(
        List<T> data,
        PaginationInfo pagable) {
}

