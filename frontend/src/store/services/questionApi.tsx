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
  },

  // 개별 질문 조회 API
  getQuestionById: (id: number) => api.get<Question>(`/question/${id}`),
};

export default questionApi;