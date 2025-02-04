declare type ServedAnswer = {
  servedQuestionId: number,
  memberId: number;
  questionId: number;
  isSolved: boolean;
  isDaily: boolean;
  servedAt: string;
}