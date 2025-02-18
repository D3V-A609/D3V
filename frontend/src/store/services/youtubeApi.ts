import api from './api';

export const youtubeApi = {
  searchVideos: async (query: string) => {
    try {
      const response = await api.get('/youtube/search', { params: { query } });
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  }
};