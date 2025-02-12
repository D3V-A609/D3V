import { createAsyncThunk } from '@reduxjs/toolkit';
import { voiceApi } from '../services/voiceApi';

export const sendVoiceRecording = createAsyncThunk(
  'voice/sendVoiceRecording',
  async (blob: Blob, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', blob, 'recording.webm');  // 파일 확장자는 필요에 맞게 변경 가능
      const response = await voiceApi.sendVoiceRecording(formData);
      return response;
    } catch (error) {
      console.log('in voice action: ', error);
      return rejectWithValue('Failed to transform the voice to Text.');
    }
  }
);
