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

  updateSingleQuestionBookmarks: async (questionId: number, bookmarkIds: number[]) => {
    try {
      const response = await api.post<BookmarkResponse>(`/bookmark/question/${questionId}/bookmark`, bookmarkIds);
      return response.data;
    } catch (error) {
      console.error('질문의 북마크 수정에 실패했습니다:', error);
      throw error;
    }
  },

  addQuestionsToBookmark: async (bookmarkId: number, questionIds: number[]) => {
    try {
      const response = await api.post<{ msg: string }>(`/bookmark/${bookmarkId}/question`, questionIds);
      return response.data;
    } catch (error) {
      console.error('북마크에 질문 추가를 실패했습니다:', error);
      throw error;
    }
  },

  fetchBookmarkById: async (bookmarkId: number) => {
    try {
      const response = await api.get<{
        bookmarkId: number;
        name: string;
        description?: string;
        accessLevel: 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
        questions: { questionId: number; content: string; skill: string }[];
      }>(`/bookmark/${bookmarkId}`);
      return response.data;
    } catch (error) {
      console.error('단일 북마크를 불러오는데 실패했습니다:', error);
      throw error;
    }
  },

  deleteBookmarkById: async (bookmarkId: number) => {
    try {
      const response = await api.delete<{ message: string }>(`/bookmark/${bookmarkId}`);
      return response.data;
    } catch (error) {
      console.error('북마크 삭제에 실패했습니다:', error);
      throw error;
    }
  },
  // 북마크에서 질문 삭제
  deleteBookmarkQuestion: async (bookmarkId: number, questionId: number) => {
    try {
      const response = await api.delete(`/bookmark/${bookmarkId}/question/${questionId}`);
      return response.data;
    } catch (error) {
      console.error('질문 삭제에 실패했습니다:', error);
      throw error;
    }
  },
  updateBookmark: async (bookmarkId: number, data: { name?: string; accessLevel?: string; description?: string }) => {
    try {
      const response = await api.patch<Bookmark>(`/bookmark/${bookmarkId}`, data);
      return response.data;
    } catch (error) {
      console.error('북마크 수정에 실패했습니다:', error);
      throw error;
    }
  },
};

export default bookmarkApi;