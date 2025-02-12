package com.ssafy.d3v.backend.member.dto;

import java.time.LocalDate;
import lombok.Builder;

@Builder
public record HistoryResponse(LocalDate date, int count) {
}
