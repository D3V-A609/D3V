// src/store/services/articleApi.ts
import api from './api';

export const articleApi = {
  // 게시글 목록 조회 API
  getArticles: async ({
    category,
    page = 1,
    size = 2,
    sort = 'LATEST',
    keyword,
  }: {
    category?: string;
    page?: number;
    size?: number;
    sort?: string;
    keyword?: string;
  } = {}) => {
    const queryParams = new URLSearchParams();

    // 선택적 파라미터들을 쿼리스트링에 추가
    if (category) queryParams.append('category', category);
    if (page !== undefined) queryParams.append('page', page.toString());
    if (size !== undefined) queryParams.append('size', size.toString());
    if (sort) queryParams.append('sort', sort);
    if (keyword) queryParams.append('keyword', keyword);

    const queryString = queryParams.toString();
    return await api.get(`/article${queryString ? `?${queryString}` : ''}`);
  },

  // 개별 게시글 조회 API
  getArticleById: (id: number) => api.get(`/article/${id}`),

  // 게시글 생성 API
  createArticle: async (data: { category: string; title: string; content: string }) => {
    return await api.post('/article', data);
  },

  // 게시글 수정 API
  updateArticle: async (id: number, data: { title?: string; content?: string }) => {
    return await api.put(`/article/${id}`, data);
  },

  // 게시글 삭제 API
  deleteArticle: async (id: number) => {
    return await api.delete(`/article/${id}`);
  },
};

export default articleApi;
