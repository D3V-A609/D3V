import { createSlice } from '@reduxjs/toolkit';
import { fetchHistory } from '../actions/historyActions';

export interface HistoryState {
  uploading: boolean;
  uploadSuccess: boolean;
  error: string | null;
  history: AnswerHistory[];
}

export const initialState: HistoryState = {
  uploading: false,
  uploadSuccess: false,
  error: null,
  history: []
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
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploadSuccess = true;
        state.history = action.payload;  // 서버 응답 값 저장
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.uploading = false;
        state.uploadSuccess = false;
        state.error = action.payload as string;
      });
  },
});

export default historySlice.reducer;
