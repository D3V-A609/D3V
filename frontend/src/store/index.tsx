// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';

// 
export const store = configureStore({
  reducer: {
    // 여기에 리듀서들이 추가될 예정
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;