import { createAsyncThunk } from "@reduxjs/toolkit";
import { heatmapApi } from "../services/heatmapApi";

export const fetchHistory = createAsyncThunk(
  'history',
  async (payload: {memberId: number, year: number}, {rejectWithValue }) => {
    try{
      const response = await heatmapApi.getHistory(payload);
      return response.data;
    }catch(error){
      console.log('in heatmap action: ', error);
      return rejectWithValue('history를 불러오는데 문제가 발생했습니다.')
    }
  }
)