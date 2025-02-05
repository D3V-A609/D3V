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

  likeAnswer: async (answerId: number, memberId: number) => {
    const response = await api.post(`/answer/${answerId}/like`, { memberId });
    return response.data;
  },

  unlikeAnswer: async (answerId: number, memberId: number) => {
    const response = await api.delete(`/answer/${answerId}/like`, { params: { memberId } });
    return response.data;
  },

  // 추가한 부분분
  // 한 질문에 대한 모든 내 답변 조회
  getMyAllAnswerByQId : (questionId: number) => {return api.get<Answer[]>(`/question/${questionId}/my_answer`);
  },

  // 답변 등록 
  registAnswer: (payload:{ questionId:number; memberId: number; content: string; accessLevel: string; 
    // isSolved: boolean 
  }) => {
    const {questionId, ...bodyPayload} = payload;
    return api.post<Answer[]>(`/question/${questionId}/answer`, bodyPayload)},

  // 첫 답변 등록 시 보내는 요청(servedquestion)
  registServedAnswer: (payload: { memberId: number; questionId:number; isSolved: boolean;}) => {return api.post<ServedAnswer>(`/servedquestion`, payload)},
  
};