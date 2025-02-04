// store/slices/dailyQuestionSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dailyQuestionApi from '../services/dailyQuestionApi';

interface DailyQuestionState {
  dailyQuestions: Question[];
  loading: boolean;
  error: string | null;
  selectedQuestionId: number | null;
}

const initialState: DailyQuestionState = {
  dailyQuestions: [],
  loading: false,
  error: null,
  selectedQuestionId: null,
};

export const fetchDailyQuestions = createAsyncThunk(
  'dailyQuestions/fetchAll',  // action type 이름을 더 명확하게
  async () => {
    const response = await dailyQuestionApi.getDailyQuestions();
    return response.data;
  }
);

const dailyQuestionSlice = createSlice({
  name: 'dailyQuestions',
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
      });
  },
});

export const { setSelectedQuestionId, clearSelectedQuestionId } = dailyQuestionSlice.actions;
export default dailyQuestionSlice.reducer;
