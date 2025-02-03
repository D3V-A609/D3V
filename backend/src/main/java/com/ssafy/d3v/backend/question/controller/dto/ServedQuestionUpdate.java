package com.ssafy.d3v.backend.question.controller.dto;

import java.time.LocalDate;
import lombok.Builder;

@Builder
public record ServedQuestionUpdate(
        Boolean isSolved,
        Boolean isDaily,
        LocalDate servedAt
) {

}
