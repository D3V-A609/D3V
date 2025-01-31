// types/question.d.ts
declare type Question = {
    id: number;
    status: "Solved" | "Unsolved";
    title: string;
    challengeCount: number;
    answerCount: number;
    jobCategory: string[];
    skills: string[];
  };
  