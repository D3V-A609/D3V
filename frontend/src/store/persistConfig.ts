// src/store/persistConfig.ts
import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { initialState, QuestionState } from './slices/questionSlice';

// 스토리지 저장 시점에 selectedQuestionId만 저장하고 나머지는 초기 상태로 설정
// 1. transform 정의
const transformSelectedQuestionId = createTransform(
  // 상태를 저장하기 전에 호출(selectedQuestionId 저장)
  (inboundState: QuestionState) => ({
    selectedQuestionId: inboundState.selectedQuestionId,
  }),

  // 저장된 상태를 복원할 때 호출 (질문 목록은 초기 상태로 복원)
  (outboundState: { selectedQuestionId: number | null }) => ({
    ...initialState,  // 나머지 상태는 초기화
    selectedQuestionId: outboundState.selectedQuestionId || initialState.selectedQuestionId,  // 저장된 질문 ID 복원
  }),
)

const persistConfig = {
  key: 'root',
  storage, // local storage에 저장
  whitelist: ['questions', 'isAuthenticated'], // questionReducer만 localStorage에 저장
  // blacklist: 저장하지 않아야 하는 reducers 정의
  transforms: [transformSelectedQuestionId],  // transform 적용
};

export default persistConfig;
