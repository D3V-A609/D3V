import { createAsyncThunk } from "@reduxjs/toolkit";
import { answerApi } from "../services/answerApi";
import { AnswerState } from "../slices/answerSlice";

export const fetchMyAnswer = createAsyncThunk(
  'answers/fetchMyAnswer',
  async (questionId: number, { rejectWithValue }) => {
    try {
      const response = await answerApi.getMyAnswer(questionId);
      return response;
    } catch (error) {
      console.error('내 답변 조회 실패:', error);
      return rejectWithValue('답변을 불러오는데 실패했습니다.');
    }
  }
);

export const fetchOtherAnswers = createAsyncThunk(
  'answers/fetchOtherAnswers',
  async (questionId: number, { rejectWithValue }) => {
    try {
      const response = await answerApi.getOtherAnswers(questionId);
      console.log("답변들: ", response);
      return response;
    } catch (error) {
      console.error('다른 답변들 조회 실패:', error);
      return rejectWithValue('답변들을 불러오는데 실패했습니다.');
    }
  }
);

// 추가한 부분
// 질문에 대한 내 모든 답변 불러오기
export const fetchAllMyAnswersByQID = createAsyncThunk(
  'answers/fetchMyAllAnswerByQID',
  async (questionId:number) => {
    const response = await answerApi.getMyAllAnswerByQId(questionId);
    return response.data;
  }
)

// 첫 질문 등록 시 보내는 요청 (servedquestion)
export const registServedAnswer = createAsyncThunk(
  'answer/registServedAnswer',
  async (payload: { questionId:number, memberId: number; isSolved: boolean 
  }) => {
    const response = await answerApi.registServedAnswer(payload);
    return response.data;
  }
)

// 질문 등록하기
export const registAnswer = createAsyncThunk(
  'answer/registAnswer',
  async (payload: { questionId:number, memberId: number; content: string; accessLevel: string; 
    // isSolved: boolean 
  }) => {
    const response = await answerApi.registAnswer(payload);
    return response.data;
  }
)

export const toggleLike = createAsyncThunk(
  'answers/toggleLike',
  async (answerId: number, { getState }) => {
    const state = getState() as { answers: AnswerState };
    const answer = state.answers.otherAnswers.find(a => a.answerId === answerId);
    if (!answer) throw new Error('Answer not found');

    const memberId = 1; // 실제 사용자 ID로 교체

    try {
      await (answer.isLiked 
        ? answerApi.unlikeAnswer(answerId, memberId) 
        : answerApi.likeAnswer(answerId, memberId));      
      
      return { 
        answerId, 
        isLiked: !answer.isLiked,
        like: answer.isLiked ? answer.like - 1 : answer.like + 1
      };
    } catch (error) {
      console.error('Like/Unlike failed:', error);
      throw error;
    }
  }
);