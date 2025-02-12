import api from './api';

export const voiceApi = {

  sendVoiceRecording: async (mediaBlob: Blob) => {
    try{
      const response = await api.post('/speech/text', mediaBlob, {
        headers: {
          'Content-Type' : 'application/octet-stream',
        },
      });
      return response.data;
    } catch(error){
      console.log('in voice api error: ', error)
      throw new Error('음성 데이터를 변환하는데 문제가 발생했습니다.')
    }
  },
}