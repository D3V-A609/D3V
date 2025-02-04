// store/services/dailyQuestionApi.ts
import api from './api';

export const questionApi = {
  getQuestions: (page = 0, size = 15) => 
    api.get<QuestionResponse>(`/question?page=${page}&size=${size}`), // 모든 질문 조회
  getQuestionById: (questionId: number) => api.get<Question>(`/question/${questionId}`), // 질문 상세 조회회
};


export default questionApi;
