// src/store/services/commentApi.ts
import api from './api';

export const commentApi = {
  // 댓글 목록 조회 API
  getComments: async ({ articleId, page = 1, size = 15 }: { articleId: number; page: number; size: number }) => {
    return await api.get(`/article/${articleId}/comment?page=${page}&size=${size}`);
  },

  // 댓글 작성 API
  createComment: async (articleId: number, content: string) => {
    return await api.post(`/article/${articleId}/comment`, { content });
  },

  // 댓글 수정 API
  updateComment: async (articleId: number, commentId: number, content: string) => {
    return await api.patch(`/article/${articleId}/comment/${commentId}`, { content });
  },

  // 댓글 삭제 API
  deleteComment: async (articleId: number, commentId: number) => {
    return await api.delete(`/article/${articleId}/comment/${commentId}`);
  },
};

export default commentApi;
