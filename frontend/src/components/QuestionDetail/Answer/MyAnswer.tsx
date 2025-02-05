import React from 'react';
import { FcViewDetails } from "react-icons/fc";
import "./MyAnswer.css";

interface MyAnswerProps {
  answer: Answer;
}

const MyAnswer: React.FC<MyAnswerProps> = ({ answer }) => {
  return (
    <div className="my-answer-container">
      <div className="answer-title">
        <FcViewDetails className="study-icon" size={24} />
          내 답변
      </div>
      <div className="my-answer-content">
        <div className="answer-label">A.</div>
        <div className="answer-text">{answer.content}</div>
      </div>
    </div>
  );
};

export default MyAnswer;