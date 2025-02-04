// store/slices/questionSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import questionApi from '../services/questionApi';
import dailyQuestionApi from '../services/dailyQuestionApi';

interface QuestionState {
  questions: Question[];         // 일반 질문 목록
  dailyQuestions: Question[];    // 일일 질문 목록
  loading: boolean;
  error: string | null;
  selectedQuestionId: number | null;
}

const initialState: QuestionState = { 
  questions: [],
  dailyQuestions: [],
  loading: false,
  error: null,
  selectedQuestionId: null,
};

export const fetchQuestions = createAsyncThunk(
  'questions/fetchAll',
  async () => {
    const response = await questionApi.getQuestions();
    return response.data;
  }
);

export const fetchDailyQuestions = createAsyncThunk(
  'questions/fetchDaily',
  async () => {
    const response = await dailyQuestionApi.getDailyQuestions();
    return response.data;
  }
);

export const fetchQuestionById = createAsyncThunk(
  'question/fetchQuestion',
  async (questionId: number) => {
    const response = await questionApi.getQuestionById(questionId);
    return response.data;
  }
)

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setSelectedQuestionId: (state, action) => {
      state.selectedQuestionId = action.payload;
    },
    clearSelectedQuestionId: (state) => {
      state.selectedQuestionId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 일반 질문 fetch 처리
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '질문을 불러오는데 실패했습니다.';
      })
      // 일일 질문 fetch 처리
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

      // 질문 상세 조회
      .addCase(fetchQuestionById.pending, (state) => { // 비동기 작업 시작
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionById.fulfilled, (state, action) => { // 비동기 작업 성공
        state.loading = false;
        state.questions[0] = action.payload;
      })
      .addCase(fetchQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '질문을 불러오는데 실패했습니다.';
      })
  },
});

export const { setSelectedQuestionId, clearSelectedQuestionId } = questionSlice.actions;
export default questionSlice.reducer;
