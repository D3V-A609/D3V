// src/store/index.tsx
// 스토어 설정 및 생성
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import rootReducer from './reducers';
import persistConfig from './persistConfig';

// persistReducer로 rootReducer를 감싸기
// persistReducer로 감쌀 때 rootReducer로 return type 지정해서 typescript가 reducer의 전체 상태 구조를 정확히 추론할 수 있도록 설정
const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer) ;


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist 사용시 비직렬화된 데이터(예: 함수, 클래스 인스턴스 등)를 상태에 저장하려고 할 때 경고가 발생
        // 특정 액션에 대한 직렬화 무시(직렬화 검사 비활성화)
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// persistStore 생성
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
