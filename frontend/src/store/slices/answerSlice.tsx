import { createSlice } from '@reduxjs/toolkit';
import { fetchMyAnswer, fetchOtherAnswers, toggleLike, fetchAllMyAnswersByQID, registAnswer, registServedAnswer } from '../actions/answerActions';

export interface AnswerState  {
  myAnswer: Answer | null; // 내 답변 
  otherAnswers: Answer[];  // 다른 사람의 답변 (답변 커뮤)
  loading: boolean;
  error: string | null;
  myAnswerArr: Answer[]; // 내 답변 기록들(답변 등록)
  servedAnswer: ServedAnswer | null; // 첫 답변 등록 시 반환 값
};

const initialState: AnswerState = {
  myAnswer: null,
  otherAnswers: [],
  loading: false,
  error: null,
  myAnswerArr: [],
  servedAnswer: null
};

const answerSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.myAnswer = action.payload[0] || null;
        state.error = null;
      })
      .addCase(fetchMyAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.myAnswer = null;
      })
      .addCase(fetchOtherAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOtherAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.otherAnswers = action.payload || [];
        state.error = null;
      })
      .addCase(fetchOtherAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.otherAnswers = [];
      })
      .addCase(toggleLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { answerId, isLiked, like } = action.payload;
        const answerToUpdate = state.otherAnswers.find(answer => answer.answerId === answerId);
        if (answerToUpdate) {
          answerToUpdate.isLiked = isLiked;
          answerToUpdate.like = like;
        }
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '추천 처리 중 오류가 발생했습니다.';
      })

      // 질문 상세 조회
      .addCase(fetchAllMyAnswersByQID.pending, (state) => { // 비동기 작업 시작
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMyAnswersByQID.fulfilled, (state, action) => { // 비동기 작업 성공
        state.loading = false;
        state.myAnswerArr = action.payload;
      })
      .addCase(fetchAllMyAnswersByQID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '질문을 불러오는데 실패했습니다.';
      })

      // 답변 등록 
      .addCase(registAnswer.pending, (state) => { // 비동기 작업 시작
        state.loading = true;
        state.error = null;
      })
      .addCase(registAnswer.fulfilled, (state, action) => { // 비동기 작업 성공
        state.loading = false;
        state.myAnswerArr = [...action.payload];  // 불변성 보장(항상 새로운 배열로 할당해야 리렌더링 트리거 가능)
      })
      .addCase(registAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '답변 등록을 실패했습니다.';
      })

      // 첫 답변의 경우(servedAnswer)
      .addCase(registServedAnswer.pending, (state) => { // 비동기 작업 시작
        state.loading = true;
        state.error = null;
      })
      .addCase(registServedAnswer.fulfilled, (state, action) => { // 비동기 작업 성공
        state.loading = false;
        state.servedAnswer = action.payload;
      })
      .addCase(registServedAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '답변 등록을 실패했습니다.';
      });
  },
});

export default answerSlice.reducer;