import api from './api';

export const voiceApi = {

  sendVoiceRecording: async (mediaBlob: Blob) => {
    const response = await api.post('/speech/text', mediaBlob, {
      headers: {
        'Content-Type' : 'application/octet-stream',
      },
    });
    return response.data;
  },
}