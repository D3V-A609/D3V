import { createAsyncThunk } from "@reduxjs/toolkit";
import { aiFeedbackApi } from "../services/aiFeedbackApi";

export const fetchMyAiFeedback = createAsyncThunk(
  'aifeedback/fetchMyAiFeedback',
  async (answer: Answer, { rejectWithValue }) => {
    try {
      const response = await aiFeedbackApi.getAiFeedback({questionId: answer.questionId, answer: answer.content})
      return response;
    } catch (error) {
      console.error('in ai feedback action -1: ', error);
      return rejectWithValue('답변의 피드백백을 불러오는데 문제가 발생했습니다.');
    }
  }
);
