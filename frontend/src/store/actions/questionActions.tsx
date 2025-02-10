// store/actions/questionActions.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import questionApi from "../services/questionApi";
import getDailyQuestions from "../services/dailyQuestionApi";


// 질문 목록 조회 비동기 액션
export const fetchQuestions = createAsyncThunk(
  'questions/fetchAll',
  async (params: QuestionParams) => {
    const response = await questionApi.getQuestions(params);
    return response.data;
  }
);


// 일일 질문 조회 비동기 액션
export const fetchDailyQuestions = createAsyncThunk(
  'questions/fetchDailyQuestions',
  async () => {
    return await getDailyQuestions();
  }
);

// 개별 질문 조회 비동기 액션
export const fetchQuestionById = createAsyncThunk(
  'question/fetchQuestion',
  async (id: number) => {
    const response = await questionApi.getQuestionById(id);
    return response.data;
  }
)
