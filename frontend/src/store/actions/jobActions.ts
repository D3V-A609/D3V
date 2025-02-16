// store/actions/jobActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import jobApi from '../services/jobApi';

export const fetchJobs = createAsyncThunk(
  'job/fetchJobs',
  async (_, {rejectWithValue}) => {
    try{
      const response = await jobApi.getJobs();
      return response.data;
    }catch(error){
      console.log('in jon action -1: ', error)
      return rejectWithValue('직무를 불러오는데 문제가 발생했습니다.')
    }
  }
);

export const fetchSkillsByJobs = createAsyncThunk(
  'job/fetchSkillsByJobs',
  async (selectedJobs: JobType[], {rejectWithValue}) => {
    try{
      const response = await jobApi.getSkillsByJobs(selectedJobs);
      return response.data;
    }catch(error){
      console.log('in job action -2: ', error)
      return rejectWithValue('직무 관련 기술을 불러오는데 문제가 발생했습니다.')
    }
  }
);
