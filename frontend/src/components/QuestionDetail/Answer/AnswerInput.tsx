import React from 'react';
// import AnswerInputComp from './AnswerInputComp';
import AnswerToggleSection from '../../../features/AnswerToggle/AnswerToggleSection';

import "./Answer.css"

// 베스트 답변 데이터를 정의
const bestAnswerData: BestAnswer = {
  questionId: 1,
  content: 'React에서 가상 DOM이 어떻게 작동하는지 설명하세요.',
  standardAnswer: 'React의 가상 DOM은 실제 DOM 변경의 성능 문제를 해결하기 위해 메모리에 가벼운 DOM 트리를 생성하여 작동합니다. 상태나 props가 변경되면 React는 새로운 가상 DOM을 생성하고, 이전 가상 DOM과 비교해 달라진 부분만 계산(diffing)합니다. 그런 다음, 변경된 부분만 실제 DOM에 효율적으로 업데이트하여 렌더링 성능을 최적화합니다. 이를 통해 빠른 UI 업데이트와 개발 효율성을 제공합니다.',
  isSolved: true,
};

const AnswerInput: React.FC = () => {
  return (
  <div>
    {/* <AnswerInputComp /> */}
    <AnswerToggleSection bestAnswer={bestAnswerData} />
  </div>);
}

export default AnswerInput;