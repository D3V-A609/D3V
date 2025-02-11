import api from './api';

export const voiceApi = {

  sendVoiceRecording: async (formData: FormData) => {
    const response = await api.post('/speech/text', formData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
      },
    });
    return response.data;
  },
}