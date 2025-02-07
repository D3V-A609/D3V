// store/slices/questionSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchDailyQuestions, fetchQuestionById } from '../actions/questionActions';

export interface QuestionState {
  dailyQuestions: DailyQuestions;
  question: QuestionDetail | null;
  loading: boolean;
  error: string | null;
  selectedQuestionId: number | null;  // 선택된 질문 ID
}

export const initialState: QuestionState = {
  dailyQuestions: [],
  question: null,
  loading: false,
  error: null,
  selectedQuestionId: null  // 선택된 질문 ID
};


// 질문 관련 리듀서 정의
const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    // 선택된 질문 ID 설정
    setSelectedQuestionId: (state, action) => {
      state.selectedQuestionId = action.payload;
    },
    // 선택된 질문 ID 초기화
    clearSelectedQuestionId: (state) => {
      state.selectedQuestionId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 일일 질문 조회 처리
      .addCase(fetchDailyQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyQuestions = action.payload;
      })
      .addCase(fetchDailyQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '일일 질문을 불러오는데 실패했습니다.';
      })

      // 개별 질문 조회 처리
      .addCase(fetchQuestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.question = action.payload;
      })
      .addCase(fetchQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '질문을 불러오는데 실패했습니다.';
      })
  },
});

export const { setSelectedQuestionId, clearSelectedQuestionId } = questionSlice.actions;
export default questionSlice.reducer;