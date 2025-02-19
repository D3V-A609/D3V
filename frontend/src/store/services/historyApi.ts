import api from './api';

export const historyApi = {

  getHistory: async (memberId: number) => {
    try{
      const response = await api.get(`/history/${memberId}`);
      return response;
    } catch(error){
      console.log('in history api error: ', error)
      throw new Error('history를 불러오는는데 문제가 발생했습니다.')
    }
  },

  getTodayStreak: async(memberId: number) => {
    try{
      const response = await api.get(`/history/streak/${memberId}`);
      return response;
    }catch(error){
      console.log('in history api error: ', error)
      throw new Error('오늘의 streak을 불러오는데 문제가 발생했습니다.')
    }
  }
}