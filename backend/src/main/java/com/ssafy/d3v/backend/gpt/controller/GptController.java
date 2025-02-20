package com.ssafy.d3v.backend.gpt.controller;

import com.ssafy.d3v.backend.gpt.dto.GptRequest;
import com.ssafy.d3v.backend.gpt.dto.GptResponse;
import com.ssafy.d3v.backend.gpt.service.GptService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class GptController {

    private final GptService gptService;

    @PostMapping("/AIFeedback")
    public GptResponse aiFeedback(@RequestBody GptRequest request) {
        return gptService.getGptResponse(request.questionId(), request.answer());
    }
}



