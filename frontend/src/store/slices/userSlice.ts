import { createSlice } from "@reduxjs/toolkit"
import { fetchUserFollowers, fetchUserFollowings, fetchMultipleUserInfo, fetchUserInfo, unFollow, follow } from "../actions/userActions";
import SecureStorage from "../services/token/SecureStorage";

import { PayloadAction } from '@reduxjs/toolkit';


export interface UserState {
  me: User | null,
  other: User | null,
  users: { [key: number]: User },
  loading: boolean;
  error: string | null;
  followers: FollowUser[];
  followings: FollowUser[];
  unfollowState: boolean;
  isFollowModalOpen: boolean, //  모달 상태 추가
  followMode: string, //  팔로우/팔로워 모드 추가
}

const initialState: UserState = {
  me: null,
  other: null,
  users: {},
  loading: false,
  error: null,
  followers: [],
  followings: [],
  unfollowState: false,
  isFollowModalOpen: false,
  followMode: "follower"
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openFollowModal: (state, action: PayloadAction<string>) => {
      state.isFollowModalOpen = true;
      state.followMode = action.payload;
    },
    closeFollowModal: (state) => {
      state.isFollowModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      const requestedMemberId = action.meta.arg; // API 요청 시 사용한 memberId
      const storedMemberId = SecureStorage.getMemberId(); // 현재 내 ID

      if (requestedMemberId === storedMemberId) {
        state.me = action.payload as User; // 내 정보 저장
      } else {
        state.other = action.payload as User; // 다른 유저 정보 저장
      }
      state.error = null;
    })
    .addCase(fetchUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      const requestedMemberId = action.meta.arg; // API 요청 시 사용한 memberId
      const storedMemberId = SecureStorage.getMemberId(); // 현재 내 ID

      if (requestedMemberId === storedMemberId) {
        state.me = null;
      } else {
        state.other = null;
      }
    })

    .addCase(fetchUserFollowers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserFollowers.fulfilled, (state, action) => {
      state.loading = false;
      if("follows" in action.payload){
        state.followers = action.payload.follows;
      }
    })
    .addCase(fetchUserFollowers.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(fetchUserFollowings.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserFollowings.fulfilled, (state, action) => {
      state.loading = false;
      if("follows" in action.payload){
        state.followings = action.payload.follows;
      }
    })
    .addCase(fetchUserFollowings.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(unFollow.pending, (state,) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(unFollow.fulfilled, (state, action) => {
      const removeId = action.meta.arg;

      state.loading = false;
      state.followings = state.followings.filter(user => user.memberId !== removeId);
      state.error = null;
    })
    .addCase(unFollow.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(follow.pending, (state,) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(follow.fulfilled, (state, action: PayloadAction<Error | responseFollow>) => {
      state.loading = false;
    
      // `follows` 배열이 존재하고 길이가 1 이상일 때만 실행
      if ("follows" in action.payload && Array.isArray(action.payload.follows) && action.payload.follows.length > 0) {
        const followUsers = action.payload.follows;
        const lastFollow = followUsers[followUsers.length-1]
        
        if (lastFollow) {
          state.followings.push(lastFollow); // `followings` 배열에 추가
        }
      }
      state.error = null;
    })
    
    .addCase(follow.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(fetchMultipleUserInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchMultipleUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload)) {
        action.payload.forEach((user: User) => {
          state.users[user.memberId] = user;
        });
      }
      state.error = null;
    })
    .addCase(fetchMultipleUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
  }
});

export const { openFollowModal, closeFollowModal } = userSlice.actions;
export default userSlice.reducer;