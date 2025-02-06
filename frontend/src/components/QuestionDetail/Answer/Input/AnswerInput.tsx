import React, { useState, useRef } from 'react';
import AnswerInputComp from './AnswerInputComp';
import AnswerToggleSection from '../../../../features/AnswerToggle/AnswerToggleSection';
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";

import "./Answer.css"

interface AnswerProps  {
  standardAnswer: string;
  myAnswers?: Answer[];
  questionId: number | null;
}

const AnswerInput: React.FC<AnswerProps> = ({standardAnswer, myAnswers, questionId}) => {
  const hasMyAnswers = myAnswers && myAnswers.length > 0; // 첫 등록 답변인지 여부를 저장


  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement | null>(null); // Toggle 위치 참조

  const btnToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  }

  // 글 등록 성공 시 Toggle 열기 및 스크롤 이동
  const handleSuccess = () => {
    if (!isToggleOpen) {
      setIsToggleOpen(true); // 토글이 닫혀 있다면 먼저 열기
    } else {
      toggleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 토글이 열려 있는 경우 바로 스크롤 이동
    }
  };

  return (
  <div>
    {questionId  && <AnswerInputComp questionId={questionId} hasMyAnswers={hasMyAnswers} handleRegistAnswerSuccess={handleSuccess} />}
    {
      hasMyAnswers && ( <>
        <div className="toggle-open-title text-gray2" onClick={btnToggleOpen}>
          { isToggleOpen ? <GoTriangleDown /> : <GoTriangleRight />}
          정답 보기
        </div>
        <div ref={toggleRef} className={isToggleOpen?'':'hidden'}>
          <AnswerToggleSection bestAnswer={standardAnswer} myAnswers={myAnswers}  />
        </div>
        </>)
    }
  </div>);
}

export default AnswerInput;