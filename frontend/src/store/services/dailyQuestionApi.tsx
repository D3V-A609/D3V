// store/services/dailyQuestionApi.ts
import api from './api';

export const getDailyQuestions = async () => {
  const response = await api.get<DailyQuestions>('/question/daily');
  return response.data;
};

export default getDailyQuestions;