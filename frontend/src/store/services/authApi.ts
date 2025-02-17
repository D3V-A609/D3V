// store/services/authApi.ts
import api from './api';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  count: number;
  result: {
    memberId: number;
    nickname: string;
    email: string;
    profileImg: string;
    githubUrl: string;
    maxStreak: number;
    ongoingStreak: number;
    providerType: 'LOCAL' | 'OAUTH';
    createdAt: string;
    favoriteJob: string;
    AccessToken: string;
  }
}

// interface SignupRequest {
//   email: string;
//   nickname: string;
//   password: string;
//   githubUrl?: string;
//   favoriteJob: string;
//   profileImage?: File;
// }

interface SignupResponse {
  message: string;
  count: number;
  result: {
    memberId: number;
    email: string;
    nickname: string;
  }
}

export const authApi = {
  // 로컬 로그인
  login: async (data: LoginRequest) => {
    const response = await api.post<LoginResponse>('/member/login', data);
    return response.data;
  },
  
  // 로그아웃
  logout: async () => {
    const response = await api.post('/member/logout');
    return response.data;
  },
  
  // 회원가입
  signup: async (data: FormData) => { 
    const response = await api.post<SignupResponse>('/member/signup', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default authApi;
