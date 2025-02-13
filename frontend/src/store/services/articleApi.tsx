import api from './api';

export const articleApi = {
  getArticles: async ({
    category,
    page = 1,
    size = 15,
    sort = 'LATEST',
    order = 'desc',
    keyword,
  }: {
    category?: string;
    page?: number;
    size?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    keyword?: string;
  } = {}) => {
    try {
      const queryParams = new URLSearchParams();
      if (category) queryParams.append('category', category);
      if (page !== undefined) queryParams.append('page', page.toString());
      if (size !== undefined) queryParams.append('size', size.toString());
      if (sort) queryParams.append('sort', sort);
      if (order) queryParams.append('order', order);
      if (keyword) queryParams.append('keyword', keyword);

      const queryString = queryParams.toString();
      return await api.get(`/article${queryString ? `?${queryString}` : ''}`);
    } catch (error) {
      console.log('in article api error-1: ', error);
      throw new Error("게시글 목록을 불러오는데 문제가 발생했습니다.");
    }
  },

  getArticleById: (id: number) => {
    try {
      return api.get(`/article/${id}`);
    } catch (error) {
      console.log('in article api error-2: ', error);
      throw new Error('게시글의 상세 내용을 불러오는데 문제가 발생했습니다.');
    }
  },
  
  createArticle: async (data: { category: string; title: string; content: string }) => {
    try {
      return await api.post('/article', data);
    } catch (error) {
      console.log('in article api error-3: ', error);
      throw new Error('게시글을 등록하는데 문제가 발생했습니다.');
    }
  },

  updateArticle: async (id: number, data: { title?: string; content?: string }) => {
    try {
      return await api.put(`/article/${id}`, data);
    } catch (error) {
      console.log('in article api error-4: ', error);
      throw new Error('게시글을 수정하는데 문제가 발생했습니다.');
    }
  },

  deleteArticle: async (id: number) => {
    try {
      return await api.delete(`/article/${id}`);
    } catch (error) {
      console.log('in article api error-5: ', error);
      throw new Error('게시글을 삭제하는데 문제가 발생했습니다.');
    }
  },
};

export default articleApi;