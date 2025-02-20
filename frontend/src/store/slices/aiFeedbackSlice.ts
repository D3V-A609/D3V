// src/store/slices/commentSlice.tsx
import { createSlice } from "@reduxjs/toolkit";
import { fetchMyAiFeedback } from "../actions/aiFeedbackActions";

export interface AiFeedbackState {
  aifeedback: string[];
  loading: boolean;
  error: string | null;
}

const initialState: AiFeedbackState = {
  aifeedback: [],
  loading: false,
  error: null,
};

const aiFeedbackSlice = createSlice({
  name: "aiFeedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAiFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAiFeedback.fulfilled, (state, action) => {
        state.loading = false;
        const answerId = action.meta.arg.answerId;
        state.aifeedback[answerId] = action.payload;
      })
      .addCase(fetchMyAiFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch ai feedback.";
      })
  },
});

export default aiFeedbackSlice.reducer;
