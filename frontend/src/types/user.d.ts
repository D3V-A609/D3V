declare type User = {
  memberId: number;
  nickname: string;
  email: string;
  profileImg?: string;
  githubUri?: string;
  maxStreak: number;
  ongoingStreak: number;
  deletedAt?: string;
  provider_type: string;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
  jobField: string;
};