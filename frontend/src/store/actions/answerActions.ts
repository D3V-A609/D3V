import { createAsyncThunk } from "@reduxjs/toolkit";
import { answerApi } from "../services/answerApi";
import { AnswerState, AnswerResponse } from "../slices/answerSlice";

export const fetchMyAnswer = createAsyncThunk<Answer[], number, { rejectValue: string }>(
  'answers/fetchMyAnswer',
  async (questionId: number, { rejectWithValue }) => {
    try {
      const response = await answerApi.getMyAnswer(questionId);
      return response;
    } catch (error) {
      console.error('in answer action -1: ', error);
      return rejectWithValue('답변을 불러오는데 문제가 발생했습니다.');
    }
  }
);

export const fetchOtherAnswers = createAsyncThunk<
  AnswerResponse,
  { questionId: number; page: number; size: number },
  { rejectValue: string }
>(
  'answers/fetchOtherAnswers',
  async ({ questionId, page, size }, { rejectWithValue }) => {
    try {
      const response = await answerApi.getOtherAnswers(questionId, page, size);
      return response; // API 응답이 이미 AnswerResponse 형식과 일치하므로 그대로 반환
    } catch (error) {
      console.error('in answer action -2: ', error);
      return rejectWithValue('답변들을 불러오는데 문제가 발생했습니다.');
    }
  }
);

export const toggleLike = createAsyncThunk(
  'answers/toggleLike',
  async (answerId: number, { getState }) => {
    const state = getState() as { answers: AnswerState };
    const otherAnswers = state.answers.otherAnswers;
    if (!otherAnswers || !otherAnswers.data) {
      throw new Error('답변을 찾을 수 없습니다.');
    }
    const answer = otherAnswers.data.find(a => a.answerId === answerId);
    if (!answer) {
      throw new Error('답변을 찾을 수 없습니다.');
    }

    const memberId = 1; // 실제 사용자 ID로 교체

    try {
      if (answer.isLiked) {
        await answerApi.unlikeAnswer(answerId, memberId);
      } else {
        await answerApi.likeAnswer(answerId, memberId);
      }
      
      return { 
        answerId, 
        isLiked: !answer.isLiked,
        like: answer.isLiked ? answer.like - 1 : answer.like + 1
      };
    } catch (error) {
      console.error('in answer action -6:', error);
      throw error;
    }
  }
);

// 추가한 부분
// 질문에 대한 내 모든 답변 불러오기
export const fetchAllMyAnswersByQID = createAsyncThunk(
  'answers/fetchMyAllAnswerByQID',
  async (questionId:number, { rejectWithValue }) => {
    try{
      const response = await answerApi.getMyAllAnswerByQId(questionId);
      return response.data;
    }catch(error){
      console.log('in answer action -3: ', error);
      return rejectWithValue('모든 답변을 불러오는데 에러가 발생했습니다')
    }
  }
)

// 첫 질문 등록 시 보내는 요청 (servedquestion)
export const registServedAnswer = createAsyncThunk(
  'answer/registServedAnswer',
  async (payload: { questionId:number, memberId: number; isSolved: boolean 
  }, { rejectWithValue }) => {
    try{
      const response = await answerApi.registServedAnswer(payload);
      return response.data;
    }catch(error){
      console.log('in answer action -4: ', error);
      return rejectWithValue("첫 답변을 등록하는데 문제가 발생했습니다.")
    }
  }
)

// 질문 등록하기
export const registAnswer = createAsyncThunk(
  'answer/registAnswer',
  async (payload: { questionId:number, memberId: number; content: string; accessLevel: string; isSolved: boolean 
  }, { rejectWithValue }) => {
    try{
      const response = await answerApi.registAnswer(payload);
      return response.data;
    }catch(error){
      console.log('in answer action -5: ', error);
      return rejectWithValue('질문을 등록하는데 문제가 발생했습니다.')
    }
  }
)

export const fetchLikedAnswers = createAsyncThunk(
  'answers/likedAnswer',
  async (_, {rejectWithValue}) => {
    try{
      const response = await answerApi.getLikedAnswers();
      return response.data;
   }catch(error){
    console.log('in answer action -7: ', error);
    return rejectWithValue('추천한 답변을 불러오는데 문제가 발생했습니다.')
   }
  }
);

export const fetchMyFeedback = createAsyncThunk(
  'feedbacks/my_feedback',
  async (_, { rejectWithValue}) => {
    try{
      const response = await answerApi.getMyFeedbacks();
      return response.data;
    }catch(error){
      console.log('in answer action -8:', error);
      return rejectWithValue('내가 작성한 피드백을 불러오는데 문제가 발생했습니다.');
    }
  }
)