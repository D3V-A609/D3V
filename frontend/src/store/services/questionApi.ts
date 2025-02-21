// store/services/questionApi.ts
import api from './api';

export const questionApi = {
  // 전체 질문 조회 API
  getQuestions: async ({
    jobs,
    skills,
    solved,
    order = 'desc',
    sort = 'acnt',
    page = 0,
    size = 15,
    keyword,
  }: QuestionParams = {}) => {
    try{

      const queryParams = new URLSearchParams();
  
      // 선택적 파라미터들을 쿼리스트링에 추가
      if (jobs?.length) jobs.forEach(job => queryParams.append('jobs', job));
      if (skills?.length) skills.forEach(skill => queryParams.append('skills', skill));
      if (solved) queryParams.append('solved', solved);
      if (order) queryParams.append('order', order);
      if (sort) queryParams.append('sort', sort);
      if (page !== undefined) queryParams.append('page', page.toString());
      if (size !== undefined) queryParams.append('size', size.toString());
      if (keyword) queryParams.append('keyword', keyword);
  
      const queryString = queryParams.toString();
      return await api.get<QuestionResponse>(`/question${queryString ? `?${queryString}` : ''}`);
    } catch(error){
      console.log('in question api error-1: ', error);
      throw new Error('전체 질문을 불러오는데 문제가 발생했습니다.')
    }
  },

  /** 개별 질문 조회 API */
  getQuestionById: (id: number) => {
    try{
      return api.get<Question>(`/question/${id}`)
    }catch(error){
      console.log('in question api error-2: ', error);
      throw new Error('질문 상세 정보를 불러오는데 문제가 발생했습니다.')
    }
  },

  // Top10 API
  getTop10Questions: ({ month, job }: { month?: string; job: string }) => {
    try{
      const queryParams = new URLSearchParams();
      if (month) {
        queryParams.append('month', month);
      }
      queryParams.append('job', job);
      
      return api.get<Question[]>(`/question/top10?${queryParams.toString()}`);
    }catch(error){
      console.log('in question api error-3: ', error);
      throw new Error('top 10 질문을 불러오는데 문재재가 발생했습니다.')
    }
  },

  /** 답변한 최신 질문 불러오기 */
  getLatestQuestions: async(isSolved:  boolean, memberId: number) => {
    try{
      const response = await api.get<myQuestion[]>(`/lastest_question?is_solved=${isSolved}&memberId=${memberId}`);
      return response.data;
    }catch(error){
      console.log('in question api error-4: ', error);
      throw new Error('내 최신 기록을 불러오는데 문제가 발생했습니다.')
    }
  }
  
};

export default questionApi;