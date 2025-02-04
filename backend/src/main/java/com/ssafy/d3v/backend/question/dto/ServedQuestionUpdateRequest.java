package com.ssafy.d3v.backend.question.dto;

import java.time.LocalDate;
import lombok.Builder;

@Builder
public record ServedQuestionUpdateRequest(
        Boolean isSolved,
        Boolean isDaily,
        LocalDate servedAt
) {

}
