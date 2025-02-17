import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../services/userApi";

export const fetchUserInfo = createAsyncThunk(
  'user/userInfo',
  async (memberId: number | null, {rejectWithValue}) => {
    try{
      const response = await UserApi.getUserInfo(memberId);

      if (typeof response === "string") {
        return rejectWithValue(response); // ✅ 만약 문자열이면 rejectWithValue 사용
      }

      return response;
    }catch(error){
      console.log("in user action -1: ", error);
      return rejectWithValue('사용자 정보를 불러오는데 문제가 발생했습니다.')
    }
  }
)