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

  getAllBookmarks: async (memberId: number) => {
    try {
      const response = await api.get<{ bookmarks: Bookmark[] }>(`/bookmark/member/${memberId}`);
      return response.data.bookmarks;
    } catch (error) {
      console.error('모든 북마크를 불러오는데 실패했습니다:', error);
      throw error;
    }
  },

  createBookmark: async (data: CreateBookmarkRequest) => {
    const response = await api.post<Bookmark>('/bookmark', data);
    return response.data;
  },

  addQuestionsToBookmark: async (bookmarkId: number, questionIds: number[]) => {
    try {
      const response = await api.put<{ msg: string }>(`/bookmark/${bookmarkId}/question`, { questions: questionIds });
      return response.data;
    } catch (error) {
      console.error('북마크에 질문 추가를 실패했습니다:', error);
      throw error;
    }
  },
};

export default bookmarkApi;