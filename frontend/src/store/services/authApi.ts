// store/services/authApi.ts
import api from './api';

// 인터페이스 정의
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

interface SignupResponse {
  message: string;
  count: number;
  result: {
    memberId: number;
    email: string;
    nickname: string;
  }
}

interface DuplicationResponse {
  message: string;
  count?: number;
  result?: boolean;
  error?: string;
  status?: number;
}

// API 함수 정의
export const authApi = {
  // 로컬 로그인
  login: async (data: LoginRequest) => {
    const response = await api.post<LoginResponse>('/member/login', data);
    return response.data;
  },
  
  // 로그아웃
  logout: async () => {
    try {
      const response = await api.get('/member/logout', {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw new Error('로그아웃 처리 중 오류가 발생했습니다.');
    }
  },
  
  // 회원가입
  signup: async (data: FormData) => { 
    const response = await api.post<SignupResponse>('/member/signup', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 이메일 중복 확인
  checkEmailDuplication: async (email: string): Promise<DuplicationResponse> => {
    try {
      const response = await api.get<DuplicationResponse>(`/member/email/duplication?email=${email}`);
      return {
        message: response.data.message,
        result: false // 사용 가능한 경우
      };
    } catch (error: any) {
      // 모든 종류의 에러에 대해 "이미 사용중인 이메일입니다." 메시지를 반환
      return {
        message: '이미 사용중인 이메일입니다.',
        result: true
      };
    }
  },

  // 닉네임 중복 확인
  checkNicknameDuplication: async (nickname: string): Promise<DuplicationResponse> => {
    try {
      const response = await api.get<DuplicationResponse>(`/member/nickname/duplication?nickname=${nickname}`);
      return {
        message: response.data.message,
        result: false // 사용 가능한 경우
      };
    } catch (error: any) {
      // 모든 종류의 에러에 대해 "이미 사용중인 닉네임입니다." 메시지를 반환
      return {
        message: '이미 사용중인 닉네임입니다.',
        result: true
      };
    }
  }
  
};

export default authApi;
