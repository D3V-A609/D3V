// src/store/reducers.ts
import { combineReducers, Reducer } from 'redux';
import questionReducer from './slices/questionSlice';
import answerReducer from './slices/answerSlice';
import voiceReducer from './slices/voiceSlice';

const rootReducer = combineReducers({
  questions: questionReducer,
  answers: answerReducer,
  voice: voiceReducer,
})  as Reducer<Partial<{
   questions: ReturnType<typeof questionReducer>;
   answers: ReturnType<typeof answerReducer>;
   voice: ReturnType<typeof voiceReducer>;
}>>;

export default rootReducer;
// RootState 타입 정의
export type RootState = ReturnType<typeof rootReducer>;
