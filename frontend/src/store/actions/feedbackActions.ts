import { createAsyncThunk } from "@reduxjs/toolkit";
import { feedbackApi } from "../services/feedbackApi";

export const fetchFeedbacks = createAsyncThunk(
  "feedbacks/fetchFeedbacks",
  async (answerId: number) => {
    const response = await feedbackApi.getFeedbacks(answerId);
    return response;
  }
);

export const createFeedback = createAsyncThunk(
  "feedbacks/createFeedback",
  async ({ answerId, content }: { answerId: number; content: string }) => {
    const response = await feedbackApi.createFeedback(answerId, content);
    return response;
  }
);

export const updateFeedback = createAsyncThunk(
  "feedbacks/updateFeedback",
  async ({ answerId, feedbackId, content }: { answerId: number; feedbackId: number; content: string }) => {
    const response = await feedbackApi.updateFeedback(answerId, feedbackId, content);
    return response;
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedbacks/deleteFeedback",
  async ({ answerId, feedbackId }: { answerId: number; feedbackId: number }) => {
    await feedbackApi.deleteFeedback(answerId, feedbackId);
    return feedbackId;
  }
);