package com.ssafy.d3v.backend.common.dto;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class BaseResponse {
    private String message;
}
