// store/actions/jobActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import jobApi from '../services/jobApi';

export const fetchJobs = createAsyncThunk(
  'job/fetchJobs',
  async () => {
    const response = await jobApi.getJobs();
    return response.data;
  }
);

export const fetchSkillsByJobs = createAsyncThunk(
  'job/fetchSkillsByJobs',
  async (selectedJobs: JobType[]) => {
    const response = await jobApi.getSkillsByJobs(selectedJobs);
    return response.data;
  }
);
