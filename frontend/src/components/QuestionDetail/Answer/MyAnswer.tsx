import React from 'react';
import { FcViewDetails } from "react-icons/fc";
import "./MyAnswer.css";
import { useAppSelector } from '../../../store/hooks/useRedux';

const MyAnswer: React.FC = () => {
  const { myAnswerArr } = useAppSelector(state => state.answers);

  // 가장 최근 답변을 가져옵니다.
  const recentAnswer = myAnswerArr.length > 0 ? myAnswerArr[myAnswerArr.length - 1] : null;

  if (!recentAnswer) return null; // 답변이 없으면 null 반환

  return (
    <div className="my-answer-container">
      <div className="answer-title">
        <FcViewDetails className="study-icon" size={24} />
          내 답변
      </div>
      <div className="my-answer-content">
        <div className="answer-label">A.</div>
        <div className="answer-text">{recentAnswer.content}</div>
      </div>
    </div>
  );
};

export default MyAnswer;
