package com.ssafy.d3v.backend.answer.service;

import com.ssafy.d3v.backend.answer.dto.AnswerQuestionResponse;
import com.ssafy.d3v.backend.answer.dto.AnswerRequest;
import com.ssafy.d3v.backend.answer.dto.AnswerResponse;
import com.ssafy.d3v.backend.answer.dto.StandardAnswerResponse;
import com.ssafy.d3v.backend.answer.dto.TextAnswerResponse;
import com.ssafy.d3v.backend.common.dto.PagedResponse;
import java.util.List;

public interface AnswerService {
    StandardAnswerResponse getStandardAnswer(long questionId);

    List<AnswerResponse> create(long questionId, AnswerRequest answerRequest);

    List<AnswerResponse> getMyAnswers(long questionId);

    PagedResponse<AnswerResponse> getTotalAnswers(long questionId, int size, int page);

    void updateAccessLevel(long answerId, String accessLevel);

    List<AnswerQuestionResponse> getLastestQuestion(boolean isSolved, long memberId);

    TextAnswerResponse convertSpeechToText(byte[] speech);

    List<AnswerResponse> getAnswerByLike();


}
