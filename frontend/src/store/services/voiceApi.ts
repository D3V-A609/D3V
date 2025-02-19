import api from './api';

export const voiceApi = {

  sendVoiceRecording: async (mediaBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("speech", mediaBlob, "recording.webm"); // 🔥 파일명 추가
  
      const response = await api.post("/speech/text", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      return response.data;
    } catch (error) {
      console.error("in voice api error:", error);
      throw new Error("음성 데이터를 변환하는데 문제가 발생했습니다.");
    }
  },
  
}