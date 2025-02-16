import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFeedbacks, createFeedback, updateFeedback, deleteFeedback } from '../actions/feedbackActions';

interface FeedbackState {
  feedbacks: Feedback[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  feedbacks: [],
  loading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action: PayloadAction<Feedback[]>) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '피드백을 불러오는데 실패했습니다.';
      })
      .addCase(createFeedback.fulfilled, (state, action: PayloadAction<Feedback>) => {
        state.feedbacks.unshift(action.payload);
      })
      .addCase(updateFeedback.fulfilled, (state, action: PayloadAction<Feedback>) => {
        const index = state.feedbacks.findIndex(feedback => feedback.feedbackId === action.payload.feedbackId);
        if (index !== -1) {
          state.feedbacks[index] = action.payload;
        }
      })
      .addCase(deleteFeedback.fulfilled, (state, action: PayloadAction<number>) => {
        state.feedbacks = state.feedbacks.filter(feedback => feedback.feedbackId !== action.payload);
      });
  },
});

export default feedbackSlice.reducer;