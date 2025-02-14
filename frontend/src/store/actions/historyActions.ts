import { createAsyncThunk } from "@reduxjs/toolkit";
import { historyApi } from "../services/historyApi";

export const fetchHistory = createAsyncThunk(
  'history',
  async (memberId: number, {rejectWithValue }) => {
    try{
      const response = await historyApi.getHistory(memberId);
      return response.data;
    }catch(error){
      console.log('in heatmap action: ', error);
      return rejectWithValue('history를 불러오는데 문제가 발생했습니다.')
    }
  }
)