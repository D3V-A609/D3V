// store/services/dailyQuestionApi.ts
import api from './api';

export const questionApi = {
  getQuestions: () => api.get<Question[]>('/question'), // 모든 질문 조회
  getQuestionById: (questionId: number) => api.get<Question>(`/question/${questionId}`), // 질문 상세 조회회
};


export default questionApi;