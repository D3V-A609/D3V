// types/question.d.ts
// interface Question {
//   id: number;
//   status: "Solved" | "Unsolved";
//   questionContent: string;
//   challengeCount: number;
//   answerCount: number;
//   jobCategory: string[];
//   skills: string[];
// }

// types/question.d.ts
interface Question {
  questionId: number;          // API 응답의 questionId
  content: string;            // API 응답의 content
  standardAnswer: string;     // API 응답의 standardAnswer
  skillList: string[];        // API 응답의 skillList
  jobList: string[];         // API 응답의 jobList
  
  // 기존에 필요한 필드들
  status?: "Solved" | "Unsolved";
  challengeCount?: number;
  answerCount?: number;
}
