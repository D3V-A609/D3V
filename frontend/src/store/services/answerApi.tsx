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
    // ✅ 쿼리 파라미터로 전송 (서버가 본문 대신 쿼리 파라미터를 요구하는 경우)
    const response = await api.post(`/answer/${answerId}/like?memberId=1`);
    return response.data;
  },

  unlikeAnswer: async (answerId: number) => {
    // ✅ 쿼리 파라미터로 전송
    const response = await api.delete(`/answer/${answerId}/like?memberId=1`);
    return response.data;
  }
};
