// declare type User = {
//   memberId: number;
//   nickname: string;
//   email: string;
//   profileImg?: string;
//   githubUri?: string;
//   maxStreak: number;
//   ongoingStreak: number;
//   deletedAt?: string;
//   provider_type: string;
//   status: "ACTIVE" | "INACTIVE" | "DELETED";
//   jobField: string;
// };

interface User {
  memberId: number;
  nickname: string;
  email: string;
  profileImg?: string;
  githubUrl?: string;
  maxStreak: number;
  ongoingStreak: number;
  providerType: string;
  createdAt: string;
  favoriteJob: string;  // 소셜 로그인 시 값 없음
  followerCount: number;
  followingCount: number;
  isFollow?: boolean | null;
}

interface FollowUser {
  memberId: number;
  nickname: string;
  profileImg: string;
  favoriteJob: string;
  maxStreak: number;
  ongoningStreak: number;
}

interface responseFollow {
  memberId: number;
  follows: FollowUser[];
}