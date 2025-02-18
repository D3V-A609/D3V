// store/services/bookmarkApi.ts
import api from './api';

export const bookmarkApi = {
  getBookmarks: async (questionId: number) => {
    try {
      const response = await api.get<BookmarkResponse>(`/bookmark/question/${questionId}/bookmark`);
      return response.data;
    } catch (error) {
      console.error('북마크 목록을 불러오는데 실패했습니다:', error);
      throw error;
    }
  },

  // 북마크 추가
  createBookmark: async (data: { name: string; description?: string; accessLevel: string }) => {
    const response = await api.post('/bookmark', data);
    return response.data;
  },

  // 북마크에 질문 추가
  addQuestionToBookmark: async (bookmarkId: number, questions: number[]) => {
    const response = await api.put(`/bookmark/${bookmarkId}/question`, { questions });
    return response.data;
  },

  updateBookmark: async (data: UpdateBookmarkRequest) => {
    try {
      const response = await api.put<Bookmark>(`/bookmark/${data.bookmarkId}`, data);
      return response.data;
    } catch (error) {
      console.error('북마크 수정에 실패했습니다:', error);
      throw error;
    }
  },

  toggleBookmark: async (bookmarkId: number, questionId: number) => {
    try {
      const response = await api.post<{ added: boolean }>(`/bookmark/${bookmarkId}/question/${questionId}`);
      return response.data;
    } catch (error) {
      console.error('북마크 토글에 실패했습니다:', error);
      throw error;
    }
  },
};

export default bookmarkApi;