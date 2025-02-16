import api from './api';

export const feedbackApi = {
  getFeedbacks: async (answerId: number) => {
    try {
      const response = await api.get<Feedback[]>(`/answer/${answerId}/feedback`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      throw new Error('피드백을 불러오는데 문제가 발생했습니다.');
    }
  },

  createFeedback: async (answerId: number, content: string) => {
    try {
      const response = await api.post<Feedback>(`/answer/${answerId}/feedback`, { content });
      return response.data;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw new Error('피드백을 생성하는데 문제가 발생했습니다.');
    }
  },

  updateFeedback: async (answerId: number, feedbackId: number, content: string) => {
    try {
      const response = await api.patch<Feedback>(`/answer/${answerId}/feedback/${feedbackId}`, { content });
      return response.data;
    } catch (error) {
      console.error('Error updating feedback:', error);
      throw new Error('피드백을 수정하는데 문제가 발생했습니다.');
    }
  },

  deleteFeedback: async (answerId: number, feedbackId: number) => {
    try {
      const response = await api.delete(`/answer/${answerId}/feedback/${feedbackId}`, { data: { answerId, feedbackId } });
      return response.data;
    } catch (error) {
      console.error('Error deleting feedback:', error);
      throw new Error('피드백을 삭제하는데 문제가 발생했습니다.');
    }
  }
};