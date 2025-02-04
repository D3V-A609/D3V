import { configureStore } from '@reduxjs/toolkit';
import answerReducer from './slices/answerSlice';

export const store = configureStore({
  reducer: {
    answers: answerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
