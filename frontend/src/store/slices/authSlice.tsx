// store/slices/authSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SecureStorage from '../services/token/SecureStorage';

interface AuthState {
  currentStep: number;
  isAuthenticated: boolean;
  user: {
    memberId: number;
    nickname: string;
    email: string;
    profileImg: string;
  } | null;
  formData: {
    email: string;
    password: string;
  }
  signupForm: SignupFormData;
  error: string | null;  // 에러 상태 추가
  loading: boolean;      // 로딩 상태 추가
}


interface SignupFormData {
  email: string;
  password: string;
  nickname: string;
  githubUrl?: string;
  favoriteJob: string;
  profileImage?: File | undefined;
}


// 세션 스토리지에서 로그인 상태 가지고 오기
const getInitialAuthState = (): boolean => {
  const storedAuth = sessionStorage.getItem('isAuthenticated');
  return storedAuth ? JSON.parse(storedAuth): false;
}

const initialState: AuthState = {
  currentStep: 1,
  isAuthenticated: getInitialAuthState(),
  user: null,
  formData: {
    email: '',
    password: '',
  },
  signupForm: {
    email: '',
    password: '',
    nickname: '',
    githubUrl: '',
    favoriteJob: '',
    profileImage: undefined
  },
  error: null,
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    loginSuccess: (state, action: PayloadAction<{ 
      isAuthenticated: boolean;
      user: AuthState['user'];
    }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      sessionStorage.setItem('isAuthenticated', JSON.stringify(action.payload.isAuthenticated));

      // 로그인 후 현재 로그인한 사용자의 memberId 값을 가지고 온다
      SecureStorage.setMemberId(null);
    },
    logout: (state) => {
      state.isAuthenticated = false;

      // 세션 스토리지에서도 삭제
      sessionStorage.removeItem('isAuthenticated');
      SecureStorage.removeId();
    },
    updateSignupForm: (state, action: PayloadAction<Partial<SignupFormData>>) => {
      state.signupForm = { ...state.signupForm, ...action.payload };
    },
    resetSignupForm: (state) => {
      state.signupForm = initialState.signupForm;
    }
  }
});

export const { 
  setCurrentStep, 
  updateFormData, 
  loginSuccess, 
  logout, 
  updateSignupForm, 
  resetSignupForm,
  setError,
  setLoading,
  clearError 
} = authSlice.actions;
export default authSlice.reducer;
