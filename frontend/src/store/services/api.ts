import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,  // 10초
});

// 추후 필요시 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    // 토큰 로직 추가 시
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    // 추후 필요시 에러 처리 로직 추가
    // if (error.response?.status === 401) {
    //   // 인증 에러 처리
    // }
    return Promise.reject(error);
  }
);

export default api;
