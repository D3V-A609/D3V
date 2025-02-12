import api from './api';

export const voiceApi = {

  sendVoiceRecording: async (formData: FormData) => {
    try{
      const response = await api.post('/speech/text', formData, {
        headers: {
          'Content-Type' : 'multipart/form-data',
        },
      });
      return response.data;
    }catch(error){
      console.log('in voice api error: ', error);
      throw new Error('음성을 변환하는데 문제가 발생했습니다.')
    }
  },
}