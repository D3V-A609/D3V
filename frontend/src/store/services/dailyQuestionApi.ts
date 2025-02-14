// store/services/dailyQuestionApi.ts
import api from './api';

export const getDailyQuestions = async () => {
  try{
    const response = await api.get<DailyQuestions>('/question/daily');
    return response.data;
  } catch(error){
    console.log("in daily quesiton api error:", error );
    throw new Error("질문을 불러오는데 문제가 생겼습니다.")
  }
};

export default getDailyQuestions;