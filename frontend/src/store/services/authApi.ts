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

  // 기타 인증 관련 API 메서드들...
  // 회원가입, 비밀번호 찾기, 토큰 갱신 등
};

export default authApi;
