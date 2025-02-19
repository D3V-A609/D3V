import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchVideos } from '../actions/youtubeActions';

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
    channelTitle: string;
    publishedAt: string;
  };
}

interface YoutubeState {
  videos: Video[];
  loading: boolean;
  error: string | null;
}

const initialState: YoutubeState = {
  videos: [],
  loading: false,
  error: null,
};

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action: PayloadAction<Video[]>) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default youtubeSlice.reducer;
