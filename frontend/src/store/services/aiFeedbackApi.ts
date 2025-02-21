import api from './api';

export const aiFeedbackApi = {
  getAiFeedback: async (payload: {questionId: number, answer: string}) => {
    try{
      const response = await api.post<AiResponse>(`/AIFeedback`, payload);
      return response.data;
    }catch(error){
      console.log('in ai feedback api error-1: ', error)
      throw new Error('답변에 대한 피드백백을 불러오는데 문제가 발생했습니다.')
    }
  },
  
};