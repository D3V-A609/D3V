import { createSlice } from '@reduxjs/toolkit';
import { fetchHistory, fetchTodayStreak } from '../actions/historyActions';

export interface HistoryState {
  uploading: boolean;
  uploadSuccess: boolean;
  error: string | null;
  todayStreak: { [memberId: number]: number }; // ✅ 사용자별 streak 저장
  history: { [memberId: number]: AnswerHistory[] }; // ✅ 사용자별 history 저장
}

export const initialState: HistoryState = {
  uploading: false,
  uploadSuccess: false,
  error: null,
  history: {},
  // streak: {},
  todayStreak: {},
};

const historySlice = createSlice({
  name: 'historys',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.uploading = true;
        state.uploadSuccess = false;
        state.error = null; // ✅ 요청 시작 시 로딩 상태로 변경
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        const memberId = action.meta.arg;
        state.history[memberId] = action.payload;
        state.uploading = false;
        state.uploadSuccess = true;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.uploading = false;
        state.uploadSuccess = false;
        state.error = action.payload as string;
      })

      .addCase(fetchTodayStreak.pending, (state) => {
        state.uploading=true;
        state.uploadSuccess = false;
        state.error = null;
      })
      .addCase(fetchTodayStreak.fulfilled, (state, action) => {
        const memberId = action.meta.arg;
        state.uploading=false;
        state.uploadSuccess = true;
        state.todayStreak[memberId] = action.payload;
        state.error = null;
      })
      .addCase(fetchTodayStreak.rejected, (state, action) => {
        state.uploading=false;
        state.uploadSuccess = false;
        state.error = action.payload as string;
      })

  },
});

export default historySlice.reducer;
