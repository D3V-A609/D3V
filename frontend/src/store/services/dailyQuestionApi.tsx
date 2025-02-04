// store/services/dailyQuestionApi.ts
import api from './api';

export const dailyQuestionApi = {
  getDailyQuestions: () => api.get<Question[]>('/question/daily'),
};


export default dailyQuestionApi;