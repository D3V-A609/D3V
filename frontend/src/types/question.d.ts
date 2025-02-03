// types/question.d.ts
declare interface Question {
  id: number;
  status: "Solved" | "Unsolved";
  questionContent: string;
  challengeCount: number;
  answerCount: number;
  jobCategory: string[];
  skills: string[];
};
