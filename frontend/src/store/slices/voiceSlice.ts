import { createSlice } from '@reduxjs/toolkit';
import { sendVoiceRecording } from '../actions/voiceActions';

export interface VoiceState {
  uploading: boolean;
  uploadSuccess: boolean;
  error: string | null;
  speechToText: string | null;  // 응답 텍스트 추가
}

export const initialState: VoiceState = {
  uploading: false,
  uploadSuccess: false,
  error: null,
  speechToText: null,
};

const voiceSlice = createSlice({
  name: 'voice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendVoiceRecording.pending, (state) => {
        state.uploading = true;
        state.uploadSuccess = false;
        state.error = null;
      })
      .addCase(sendVoiceRecording.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploadSuccess = true;
        state.speechToText = action.payload;  // 서버 응답 값 저장
      })
      .addCase(sendVoiceRecording.rejected, (state, action) => {
        state.uploading = false;
        state.uploadSuccess = false;
        state.error = action.payload as string;
      });
  },
});

export default voiceSlice.reducer;
