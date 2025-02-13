// src/store/reducers.ts
import { combineReducers, Reducer } from 'redux';
import questionReducer from './slices/questionSlice';
import answerReducer from './slices/answerSlice';
import articleReducer from './slices/articleSlice';
import voiceReducer from './slices/voiceSlice';
import jobReducer from './slices/jobSlice';
import commentReducer from './slices/commentSlice';
import feedbackReducer from './slices/feedbackSlice';

const rootReducer = combineReducers({
  questions: questionReducer,
  answers: answerReducer,
  articles: articleReducer,
  voice: voiceReducer,
  jobs: jobReducer,
  comments: commentReducer,
  feedbacks: feedbackReducer,
}) as Reducer<{
  questions: ReturnType<typeof questionReducer>;
  answers: ReturnType<typeof answerReducer>;
  articles: ReturnType<typeof articleReducer>;
  voice: ReturnType<typeof voiceReducer>;
  jobs: ReturnType<typeof jobReducer>;
  comments: ReturnType<typeof commentReducer>;
  feedbacks: ReturnType<typeof feedbackReducer>;
}>;


export default rootReducer;

// RootState 타입 정의
export type RootState = ReturnType<typeof rootReducer>;
