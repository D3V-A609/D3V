declare type Answer = {
  questionId: number;
  memberId: number;
  answerId: number;
  content: string;
  createdAt: string;
  accessLevel: "PUBLIC" | "PRIVATE" | "PROTECTED";
  like: number;
  commentCount: number;
  isLiked?: boolean; // 내가 추천했는지 여부
};