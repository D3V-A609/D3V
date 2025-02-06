// src/store/reducers.ts
import { combineReducers, Reducer } from 'redux';
import questionReducer from './slices/questionSlice';
import answerReducer from './slices/answerSlice';

const rootReducer = combineReducers({
  questions: questionReducer,
  answers: answerReducer,
})  as Reducer<Partial<{
   questions: ReturnType<typeof questionReducer>;
   answers: ReturnType<typeof answerReducer>;
}>>;

export default rootReducer;
// RootState 타입 정의
export type RootState = ReturnType<typeof rootReducer>;
