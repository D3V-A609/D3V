import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SignupState = {
  currentStep: 1,
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
    }
  }
});


export default authSlice.reducer;

