import api from './api';

export const answerApi = {
  getMyAnswer: async (questionId: number) => {
    const response = await api.get<Answer[]>(`/question/${questionId}/my_answer`);
    return response.data.find(answer => answer.memberId === 1);
  },

  getOtherAnswers: async (questionId: number) => {
    const response = await api.get<Answer[]>(`/question/${questionId}/answer`);
    return response.data.filter(answer => answer.memberId !== 1);
  },

  likeAnswer: async (answerId: number) => {
    const response = await api.post(`/answer/${answerId}/like`, { 
      params: { memberId: 1 }
    });
    return response.data;
  },
  

  unlikeAnswer: async (answerId: number) => {
    const response = await api.delete(`/answer/${answerId}/like`, {
      data: { memberId: 1 } // DELETE 요청 본문 처리
    });
    return response.data;
  }
};
