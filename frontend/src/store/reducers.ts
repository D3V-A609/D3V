// src/store/reducers.ts
import { combineReducers, Reducer } from 'redux';
import questionReducer from './slices/questionSlice';
import answerReducer from './slices/answerSlice';
import articleReducer from './slices/articleSlice';

const rootReducer = combineReducers({
  questions: questionReducer,
  answers: answerReducer,
  articles: articleReducer,
})  as Reducer<Partial<{
   questions: ReturnType<typeof questionReducer>;
   answers: ReturnType<typeof answerReducer>;
   articles: ReturnType<typeof articleReducer>;
}>>;

export default rootReducer;
// RootState 타입 정의
export type RootState = ReturnType<typeof rootReducer>;
