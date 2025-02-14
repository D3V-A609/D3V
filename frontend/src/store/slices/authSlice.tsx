// store/slices/authSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  currentStep: number;
  isAuthenticated: boolean;
  formData: {
    email: string;
    password: string;
  }
}

const initialState: AuthState = {
  currentStep: 1,
  isAuthenticated: false,
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
    }
  }
});

export const { setCurrentStep, updateFormData, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
