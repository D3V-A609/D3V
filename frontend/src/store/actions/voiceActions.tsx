import { createAsyncThunk } from '@reduxjs/toolkit';
import { voiceApi } from '../services/voiceApi';

export const sendVoiceRecording = createAsyncThunk(
  'voice/sendVoiceRecording',
  async (mediaBlob: Blob, { rejectWithValue }) => {
    try {
      // const formData = new FormData();
      // formData.append('speech', mediaBlob);
      const response = await voiceApi.sendVoiceRecording(mediaBlob);
      return response;
    } catch (_) {
      return rejectWithValue('Failed to transform the voice to Text.');
    }
  }
);
