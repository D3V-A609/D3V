import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobApi } from '../services/jobApi';

const initialState: JobState = {
  jobs: [],
  loading: false,
  error: null
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async () => {
    const response = await jobApi.getJobs();
    return response.data;
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '직무 목록을 불러오는데 실패했습니다.';
      });
  }
});

export default jobSlice.reducer;
