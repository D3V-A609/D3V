const dummyOtherAnswers: Answer[] = [
  {
    questionId: 1,
    memberId: 2,
    answerId: 2,
    answer: "가상 DOM은 React가 화면을 더 빠르게 업데이트하기 위해 사용하는 기술입니다. 상태나 props가 바뀌면 가상 DOM에서 먼저 새로운 화면을 만들고, 이전 가상 DOM과 비교해서 뭐가 바뀌었는지 확인합니다. 확인된 바뀐 부분만 실제 DOM에 반영해서 성능을 높입니다.",
    createdAt: "2024-01-28",
    accessLevel: "PUBLIC",
    answerLike: 3,
    commentCount: 3  // answerId: 2인 댓글이 3개 있음
  },
  {
    questionId: 1,
    memberId: 3,
    answerId: 3,
    answer: "React의 가상 DOM의 핵심 장점은 성능 최적화입니다. 상태나 props가 변경되면 React는 새로운 가상 DOM을 생성하고, 이전 가상 DOM과 비교(diffing)하여 변경된 부분을 식별합니다. 그 뒤에 이 변경 사항만 실제 DOM에 반영하기 때문에 전체 DOM을 다시 그리는 비효율을 줄이고 성능을 최적화합니다.",
    createdAt: "2024-01-24",
    accessLevel: "PUBLIC",
    answerLike: 2,
    commentCount: 2  // answerId: 3인 댓글이 2개 있음
  }
];
export default dummyOtherAnswers;
