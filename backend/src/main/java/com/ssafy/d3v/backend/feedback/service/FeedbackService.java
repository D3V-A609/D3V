package com.ssafy.d3v.backend.feedback.service;

import com.ssafy.d3v.backend.feedback.dto.FeedbackRequest;
import com.ssafy.d3v.backend.feedback.dto.FeedbackResponse;
import java.util.List;

public interface FeedbackService {
    List<FeedbackResponse> get(long answerId);

    FeedbackResponse create(long answerId, FeedbackRequest feedbackRequest);

    FeedbackResponse update(long answerId, long feedbackId, FeedbackRequest feedbackRequest);

    void delete(long answerId, long feedbackId);
}
