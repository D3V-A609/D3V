import api from './api';

export const answerApi = {
  getMyAnswer: async (questionId: number) => {
    try{
      const response = await api.get<Answer[]>(`/question/${questionId}/my_answer`);
      // return response.data.find(answer => answer.memberId === 1);
      return response.data;
    }catch(error){
      console.log('in answer api error-1: ', error)
      throw new Error('내 답변을 불러오는데 문제가 발생했습니다.')
    }
  },

  getOtherAnswers: async (questionId: number) => {
    try{
      const response = await api.get<Answer[]>(`/question/${questionId}/answer`);
      // return response.data.filter(answer => answer.memberId !== 1);
      return response.data;
    } catch(error){
      console.log('in answer api error-2: ', error)
      throw new Error('모든 답변을 불러오는데 문제가 발생했습니다.')
    }
  },

  likeAnswer: async (answerId: number, memberId: number) => {
    try{
      const response = await api.post(`/answer/${answerId}/like`, { memberId });
      return response.data;
    } catch(error){
      console.log('in answer api error-3: ', error);
      throw new Error('답변을 추천하는데 문제가 발생했습니다.')
    }
  },

  unlikeAnswer: async (answerId: number, memberId: number) => {
    try{
      const response = await api.delete(`/answer/${answerId}/like`, { params: { memberId } });
      return response.data;
    }catch(error){
      console.log('in answer api error-4: ', error);
      throw new Error('답변 추천을 취소하는데 문제가 발생했습니다.')
    }
  },

  // 추가한 부분
  // 한 질문에 대한 모든 내 답변 조회
  getMyAllAnswerByQId : (questionId: number) => {
    try{
      return api.get<Answer[]>(`/question/${questionId}/my_answer`);
    } catch(error){
      console.log('in answer api error-5: ', error)
      throw new Error('내 모든 답변을 불러오는데 문제가 발생했습니다.')
    }
  },

  // 답변 등록 
  registAnswer: (payload:{ questionId:number; memberId: number; content: string; accessLevel: string; isSolved: boolean 
  }) => {
    try{
      // const {questionId, ...bodyPayload} = payload;
      return api.post<Answer[]>(`/question/${payload.questionId}/answer`, payload)
    }catch(error){
      console.log('in answer api error-6: ', error);
      throw new Error('답변을 등록하는데 문제가 발생했습니다.')
    }
  },

  // 첫 답변 등록 시 보내는 요청(servedquestion)
  registServedAnswer: (payload: { memberId: number; questionId:number; isSolved: boolean;}) => {
    try{
      return api.post<ServedAnswer>(`/servedquestion`, payload)
    } catch(error){
      console.log('in answer api error-7: ', error)
      throw new Error('첫 답변 등록하는데 문제가 발생했습니다.')
    }
  },

  // 추천을 누른 답변들 
  getLikedAnswers: () => {
    try{
      return api.get<Answer[]>(`/member/liked_answer`);
    }catch(error){
      console.log('in answer api error-8:', error);
      throw new Error('추천한 답변들을 불러오는데 문제가 발생했습니다.');
    }
  },

  // 내가 작성한 피드백
  getMyFeedbacks: () => {
    try{
      return api.get<Feedback[]>(`/my_feedback`);
    }catch(error){
      console.log('in answer api error-9:', error)
      throw new Error('내가 작성한 피드백을 불러오는데 문제가 발생했습니다.')
    }
  }
  
};