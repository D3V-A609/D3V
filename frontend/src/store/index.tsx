// src/store/index.tsx
import { configureStore } from '@reduxjs/toolkit';
import dailyQuestionReducer from './slices/dailyQuestionSlice';

export const store = configureStore({
  reducer: {
    dailyQuestions: dailyQuestionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;