import React, { useState, useEffect, useRef } from 'react';
import AnswerInputComp from './AnswerInputComp';
import AnswerToggleSection from '../../../features/AnswerToggle/AnswerToggleSection';
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
    // btnToggleOpen();
    setIsToggleOpen(true);
    toggleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 스크롤 이동
  };

  // myAnswers가 업데이트될 때마다 상태 업데이트
  useEffect(() => {
  }, [myAnswers]);

  console.log("내 답변이 제대로 왔나?", myAnswers);

  return (
  <div>
    {questionId  && <AnswerInputComp questionId={questionId} hasMyAnswers={hasMyAnswers} handleRegistAnswerSuccess={handleSuccess} />}
    {
      hasMyAnswers && (
        isToggleOpen? <>
        <div className="toggle-open-title text-gray2" onClick={btnToggleOpen}>
          <GoTriangleDown />
          정답 보기
        </div>
        <div ref={toggleRef}>
          <AnswerToggleSection bestAnswer={standardAnswer} myAnswers={myAnswers} />
        </div>
        </> : 
        <div className="toggle-close-title text-gray2" onClick={btnToggleOpen}>
          <GoTriangleRight />
          정답 보기
        </div>
      )
    }
  </div>);
}

export default AnswerInput;