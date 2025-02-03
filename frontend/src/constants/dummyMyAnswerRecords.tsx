// src/constants/dummyMyAnswerRecords.tsx
const dummyMyAnswerRecords = [
  {
    questionId: 1,
    memberId: 1,
    answerId: 1,
    createdAt: "2024-01-23T10:00:00Z",
    accessLevel: "PUBLIC",
    answer:
      "React의 가상 DOM은 메모리에서 작동하는 가벼운 DOM 트리입니다. 상태나 props가 변경될 때 새로운 가상 DOM을 생성하고 이전 가상 DOM과 비교(diffing)해서 변경된 부분만 실제 DOM에 반영합니다. 이를 통해 전체 DOM을 재렌더링하지 않고, 효율적으로 화면을 업데이트합니다.",
      answerLike: 0
  },
  {
    questionId: 1,
    memberId: 1,
    answerId: 2,
    createdAt: "2025-02-03T15:30:00Z",
    accessLevel: "PUBLIC",
    answer:
      "React의 가상 DOM은 메모리에서 작동하는 가벼운 DOM입니다. 상태나 props가 변경되면 React는 새로운 가상 DOM을 생성하고, 이전 가상 DOM과 비교(diffing)하여 변경된 부분을 식별합니다. 그 뒤에 이 변경 사항만 실제 DOM에 반영하기 때문에 전체 DOM을 다시 그리는 비효율을 줄이고 성능을 최적화합니다. 이런 방식은 선언적 UI와 잘 맞아떨어져 코드 관리도 쉬워집니다.",
      answerLike: 0
  },
  {
    questionId: 1,
    memberId: 1,
    answerId: 3,
    createdAt: "2024-12-27T12:00:00Z",
    accessLevel: "PUBLIC",
    answer:
      "가상 DOM은 React가 효율적으로 화면을 업데이트하기 위해 사용하는 기술입니다. 컴포넌트의 상태나 props가 변경되면, 가상 DOM에서 새로운 화면을 만들어 이전과 비교(diffing)한 뒤, 바뀐 부분만 실제 DOM에 적용해서 성능을 높입니다.",
      answerLike: 0
  },
  {
    questionId: 1,
    memberId: 1,
    answerId: 4,
    createdAt: "2024-11-22T09:45:00Z",
    accessLevel: "PUBLIC",
    answer:
      "가상 DOM은 React가 화면을 더 빠르게 업데이트하기 위해 사용하는 기술입니다. 상태나 props가 바뀌면 가상 DOM에서 먼저 새로운 화면을 만들고, 이전 가상 DOM과 비교해서 뭐가 바뀌었는지 확인합니다. 확인된 바뀐 부분만 실제 DOM에 반영해서 성능을 높입니다.",
    answerLike: 0
  },
]

export default dummyMyAnswerRecords;