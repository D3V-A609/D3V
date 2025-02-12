// store/actions/questionActions.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import questionApi from "../services/questionApi";
import getDailyQuestions from "../services/dailyQuestionApi";


// 질문 목록 조회 비동기 액션
export const fetchQuestions = createAsyncThunk(
  'questions/fetchAll',
  async (params: QuestionParams, {rejectWithValue}) => {
    try{
      const response = await questionApi.getQuestions(params);
      return response.data;
    } catch(error){
      console.log('in question action -1: ', error)
      return rejectWithValue('질문 목록을 불러오는데 문제가 발생했습니다.')
    }
  }
);


// 일일 질문 조회 비동기 액션
export const fetchDailyQuestions = createAsyncThunk(
  'questions/fetchDailyQuestions',
  async (_, { rejectWithValue }) => {
    try{
      return await getDailyQuestions();
    }catch(error){
      console.log('in question action -2: ', error);
      return rejectWithValue('일일 질문을 불러오는데 문제가 발생했습니다.')
    }
  }
);

// 개별 질문 조회 비동기 액션
export const fetchQuestionById = createAsyncThunk(
  'question/fetchQuestion',
  async (id: number, {rejectWithValue}) => {
    try{
      const response = await questionApi.getQuestionById(id);
      return response.data;
    }catch(error){
      console.log('in quetsion action -3: ', error)
      return rejectWithValue('질문 상세정보를 불러오는데 문제가 발생했습니다.')
    }
  }
)

// Top10 질문 조회 비동기 액션
export const fetchTop10Questions = createAsyncThunk(
  'questions/fetchTop10',
  async (params: { month?: string; job: string }, {rejectWithValue}) => {
    try{
      const response = await questionApi.getTop10Questions(params);
      return response.data;
    }catch(error){
      console.log('in question action -4: ', error);
      return rejectWithValue('top 10 질문을 불러오는데 문제가 발생했습니다.')
    }
  }
)