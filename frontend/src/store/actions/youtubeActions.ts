import { createAsyncThunk } from '@reduxjs/toolkit';
import { youtubeApi } from '../services/youtubeApi';

export const fetchVideos = createAsyncThunk(
  'youtube/fetchVideos',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await youtubeApi.searchVideos(query);
      return response.items; // video items 반환
    } catch (error) {
      console.error(error);
      return rejectWithValue('Failed to fetch videos');
    }
  }
);
