// src/store/index.tsx
import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './slices/questionSlice';
import answerReducer from './slices/answerSlice'

export const store = configureStore({
  reducer: {
    questions: questionReducer,
    answers: answerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;