package com.ssafy.d3v.backend.gpt.dto;

import java.util.List;

public record GptResponse (
    List<String> good,
    List<String> bad,
    List<String> feedback
){}
