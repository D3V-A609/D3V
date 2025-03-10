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

interface UpdateProfileResponse {
  memberId: number;
  nickname: string;
  email: string;
  profileImg: string;
  githubUrl: string;
  maxStreak: number;
  ongoingStreak: number;
  providerType: string;
  createdAt: string | null;
  favoriteJob: string;
  followerCount: number;
  followingCount: number;
  isFollow: boolean | null;
}


interface TemporaryPasswordResponse {
  message: string;
}

interface EmailVerificationResponse {
  message: string;
  result?: boolean;
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

  // 회원 정보 수정
  updateProfile: async (data: FormData): Promise<UpdateProfileResponse> => {
    const response = await api.patch<UpdateProfileResponse>('/member', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 회원 탈퇴
  deleteMember: async (): Promise<void> => {
    try {
      await api.delete('/member');
      // 응답 데이터를 반환하지 않음
    } catch (error: any) {
      console.error('회원 탈퇴 처리 실패:', error.response?.data);
      throw error;
    }
  },

  // 임시 비밀번호 요청 코드 요청
  requestTemporaryPassword: async (email: string): Promise<TemporaryPasswordResponse> => {
    try {
      const response = await api.post<string>('/member/email/password', { email });
      return {
        message: response.data // 서버에서 string으로 오는 응답을 message로 변환
      };
    } catch (error: any) {
      console.error('임시 비밀번호 요청 실패:', error.response?.data);
      throw error;
    }
  },

  // 이메일 인증 코드 요청
  sendEmailVerification: async (email: string): Promise<EmailVerificationResponse> => {
    try {
      const response = await api.post('/member/email/code', { email });
      return response.data;
    } catch (error: any) {
      console.error('이메일 인증 코드 전송 실패:', error.response?.data);
      throw error;
    }
  },

  // 이메일 인증 코드 확인
  verifyEmailCode: async (email: string, code: string): Promise<EmailVerificationResponse> => {
    const response = await api.post('/member/email/authentication', { 
      email, 
      code 
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

  // // CORS 부분 해결하면 아래 코드로 대체하고자 함
  // // 이메일 중복 확인
  // checkEmailDuplication: async (email: string): Promise<DuplicationResponse> => {
  //   try {
  //     const response = await api.get<DuplicationResponse>(`/member/email/duplication?email=${email}`);
  //     return {
  //       message: response.data.message,
  //       result: false // 사용 가능한 경우
  //     };
  //   } catch (error: any) {
  //     if (error.response?.status === 400) {
  //       return {
  //         message: error.response.data.message,
  //         result: true // 중복인 경우
  //       };
  //     }
  //     throw error; // 기타 에러의 경우 상위로 전파
  //   }
  // },

  // // 닉네임 중복 확인
  // checkNicknameDuplication: async (nickname: string): Promise<DuplicationResponse> => {
  //   try {
  //     const response = await api.get<DuplicationResponse>(`/member/nickname/duplication?nickname=${nickname}`);
  //     return {
  //       message: response.data.message,
  //       result: false // 사용 가능한 경우
  //     };
  //   } catch (error: any) {
  //     if (error.response?.status === 400) {
  //       return {
  //         message: error.response.data.message,
  //         result: true // 중복인 경우
  //       };
  //     }
  //     throw error; // 기타 에러의 경우 상위로 전파
  //   }
  // }
};

export default authApi;
