// store/slices/jobSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJobs, fetchSkillsByJobs } from '../actions/jobActions';


const initialState: JobState = {
  jobs: [],
  selectedJobs: [],
  skills: [],
  loading: false,
  error: null,
  status: 'idle',
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setSelectedJobs: (state, action: PayloadAction<JobType[]>) => {
      state.selectedJobs = action.payload;
    },
    clearSelectedJobs: (state) => {
      state.selectedJobs = [];
      state.skills = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 직무 목록 조회
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
      })
      // 기술 목록 조회
      .addCase(fetchSkillsByJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillsByJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkillsByJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '기술 목록을 불러오는데 실패했습니다.';
      });
  },
});

export const { setSelectedJobs, clearSelectedJobs, clearError } = jobSlice.actions;
export default jobSlice.reducer;
