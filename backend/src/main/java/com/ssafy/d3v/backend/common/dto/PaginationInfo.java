package com.ssafy.d3v.backend.common.dto;

import org.springframework.data.domain.Page;

public record PaginationInfo(
        long totalRecords,
        int currentPage,
        int totalPages,
        Integer nextPage,
        Integer prevPage) {

    public static PaginationInfo from(Page<?> page) {
        int currentPage = page.getNumber() + 1;
        int totalPages = page.getTotalPages();
        Integer nextPage = (currentPage < totalPages) ? currentPage + 1 : null;
        Integer prevPage = (currentPage > 1) ? currentPage - 1 : null;

        return new PaginationInfo(
                page.getTotalElements(),
                currentPage,
                totalPages,
                nextPage,
                prevPage
        );
    }
}
