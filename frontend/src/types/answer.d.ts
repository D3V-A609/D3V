// types/answer.d.ts
interface Answer {
  questionId: number;
  memberId: number;
  answerId: number;
  answer: string;
  createdAt: string;
  accessLevel: "PUBLIC" | "PRIVATE" | "PROTECTED";
  answerLike: number;
}