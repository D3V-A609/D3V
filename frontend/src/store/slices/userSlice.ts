import { createSlice } from "@reduxjs/toolkit"
import { fetchUserInfo, fetchMultipleUserInfo } from "../actions/userActions";
import SecureStorage from "../services/token/SecureStorage";

export interface UserState {
  me: User | null,
  other: User | null,
  users: { [key: number]: User },
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  me: null,
  other: null,
  users: {},
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      const requestedMemberId = action.meta.arg; // API 요청 시 사용한 memberId
      // const storedMemberId = SecureStorage.getMemberId(); // 현재 내 ID

      if (requestedMemberId === null) {
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

export default userSlice.reducer;