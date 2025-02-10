// types/question.d.ts

// 질문의 기본 구조
interface Question {
  id: number;
  content: string;
  standardAnswer: string;
  answerCount: number;
  challengeCount: number;
  questionJobs: null;
}

// 개별 질문
interface QuestionDetail extends Question {
  status: "solved" | "unSolved" | "notSolved";
  skillList: string[]; // 기술 스택 (예: "REACT", "DOCKER" 등)
  jobList: string[]; // 직무 (예: "FRONTEND", "DEVOPS" 등)
}

type DailyQuestions = QuestionDetail[];