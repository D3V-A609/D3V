package com.ssafy.d3v.backend.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class SpeechToTextException extends RuntimeException {
    public SpeechToTextException(String message) {
        super(message);
    }
}
