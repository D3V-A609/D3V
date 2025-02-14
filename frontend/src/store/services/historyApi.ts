import api from './api';

export const historyApi = {

  getHistory: async (memberId: number) => {
    try{
      const response = await api.get(`/history/${memberId}`);
      return response;
    } catch(error){
      console.log('in voice api error: ', error)
      throw new Error('history를 불러오는는데 문제가 발생했습니다.')
    }
  },
}