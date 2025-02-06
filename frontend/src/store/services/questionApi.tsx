// store/services/dailyQuestionApi.ts
import api from './api';

export const questionApi = {
  getQuestions: (page = 0, size = 15) => 
    api.get<QuestionResponse>(`/question?page=${page}&size=${size}`), // 모든 질문 조회
  getQuestionById: (questionId: number) => api.get<Question>(`/question/${questionId}`), // 질문 상세 조회

  // Top10 API
  getTop10Questions: ({ month, job }: { month?: string; job: string }) => {
    const queryParams = new URLSearchParams();
    if (month) queryParams.append('month', month);
    queryParams.append('job', job);
    
    return api.get<Question[]>(`/question/top10?${queryParams.toString()}`);
  }
  
};


export default questionApi;
