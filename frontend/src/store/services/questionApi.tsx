// store/services/dailyQuestionApi.ts
import api from './api';

export const questionApi = {
  getQuestions: () => api.get<Question[]>('/question'),
};


export default questionApi;