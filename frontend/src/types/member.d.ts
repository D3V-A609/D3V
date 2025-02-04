declare interface Member {
    memberId: number;
    nickname: string;
    email: string;
    profileImg?: string;
    githubUrl?: string;
    maxStreak: number;
    ongoingStreak: number;
    providerType: 'LOCAL' | 'KAKAO';
    createdAt: string;
  }
  