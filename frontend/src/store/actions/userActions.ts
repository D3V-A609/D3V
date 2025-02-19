import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../services/userApi";

export const fetchUserInfo = createAsyncThunk(
  'user/userInfo',
  async (memberId: number, {rejectWithValue}) => {
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
);

export const fetchUserFollowers = createAsyncThunk(
  'user/follower',
  async (memberId: number, {rejectWithValue}) => {
    try{
      const response = await UserApi.getUserFollower(memberId);
      return response;
    }catch(error){
      console.log('in user action-2: ', error);
      return rejectWithValue('팔로워 정보를 불러오는데 문제가 발생했습니다.')
    }
  }
);

export const fetchUserFollowings = createAsyncThunk(
  'user/following',
  async (memberId: number, {rejectWithValue}) => {
    try{
      const response = await UserApi.getUserFollowing(memberId);
      return response;
    }catch(error){
      console.log('in user action-2: ', error);
      return rejectWithValue('팔로잉 정보를 불러오는데 문제가 발생했습니다.')
    }
  }
);

export const unFollow = createAsyncThunk(
  'user/unfollow',
  async (memberId: number, {rejectWithValue}) => {
    try{
      const response = await UserApi.deleteFollowing(memberId);
      return {memberId, message: response};
    }catch(error){
      console.log('in user action-3:', error)
      return rejectWithValue('언팔로우하는데 문제가 발생했습니다.')
    }
  }
);

export const follow = createAsyncThunk(
  'user/follow',
  async (memberId: number, {rejectWithValue}) => {
    try{
      const response = await UserApi.createFollowing(memberId);
      return response;
    }catch(error){
      console.log('in user action-4:', error)
      return rejectWithValue('팔로우하는데 문제가 발생했습니다.')
    }
  }
);

export const fetchMultipleUserInfo = createAsyncThunk(
  'user/multipleUserInfo',
  async (memberIds: number[], {rejectWithValue}) => {
    try {
      const response = await UserApi.getMultipleUserInfo(memberIds);
      if (typeof response === "string") {
        return rejectWithValue(response);
      }
      return response;
    } catch(error) {
      console.log("in user action -2: ", error);
      return rejectWithValue('여러 사용자 정보를 불러오는데 문제가 발생했습니다.')
    }
  }
)