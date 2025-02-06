import { createAsyncThunk } from "@reduxjs/toolkit";
import questionApi from "../services/questionApi";
import dailyQuestionApi from "../services/dailyQuestionApi";


// 질문 목록 조회 비동기 액션
export const fetchQuestions = createAsyncThunk(
  'questions/fetchAll',
  async ({ page = 0, size = 15 }: { page?: number; size?: number } = {}) => {
    const response = await questionApi.getQuestions(page, size);
    return response.data;
  }
);

// 일일 질문 조회 비동기 액션
export const fetchDailyQuestions = createAsyncThunk(
  'questions/fetchDaily',
  async () => {
    const response = await dailyQuestionApi.getDailyQuestions();
    return response.data;
  }
);

// 개별 질문 조회 비동기 액션
export const fetchQuestionById = createAsyncThunk(
  'question/fetchQuestion',
  async (questionId: number) => {
    const response = await questionApi.getQuestionById(questionId);
    return response.data;
  }
)
