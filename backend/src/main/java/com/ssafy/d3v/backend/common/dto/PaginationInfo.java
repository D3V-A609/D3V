package com.ssafy.d3v.backend.common.dto;

public record PaginationInfo(
        long totalRecords,
        int currentPage,
        int totalPages,
        Integer nextPage,
        Integer prevPage) {
}
