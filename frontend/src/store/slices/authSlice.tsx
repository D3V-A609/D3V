// store/slices/authSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  currentStep: number;
  isAuthenticated: boolean; // 로그인 여부를 저장
  formData: {
    email: string;
    password: string;
  }
}
// 세션 스토리지에서 로그인 상태 가지고 오기
const getInitialAuthState = (): boolean => {
  const storedAuth = sessionStorage.getItem('isAuthenticated');
  return storedAuth ? JSON.parse(storedAuth): false;
}

const initialState: AuthState = {
  currentStep: 1,
  isAuthenticated: getInitialAuthState(), // 세션에서 초기값 가지고오기기
  formData: {
    email: '',
    password: '',
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    loginSuccess: (state, action: PayloadAction<{ isAuthenticated: boolean }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;

      // 세션 스토리지에 로그인 상태 저장
      sessionStorage.setItem('isAuthenticated', JSON.stringify(action.payload.isAuthenticated));
    },
    logout: (state) => {
      state.isAuthenticated = false;

      // 세션 스토리지에서도 삭제
      sessionStorage.removeItem('isAuthenticated');
    }
  }
});

export const { setCurrentStep, updateFormData, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
