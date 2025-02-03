import React from 'react';

import ThugUpImg from "../../assets/images/Thumbs-Up.png";

interface BestAnswerProps {
  bestAnswer: BestAnswer;
}

const BestAnswer:React.FC<BestAnswerProps> = ({bestAnswer}) => {
  return (
  <div >
    <div className="best-answer-container">
          <div className="best-answer-title">
            <img src={ThugUpImg} alt="thug-up-img" style={{width: '35px', height: '35px'}} />
              Best 답변
          </div>
          <div className="best-answer-content">
            <div className="answer-label">A.</div>
            <div className="answer-text">{bestAnswer.standardAnswer}</div>
          </div>
        </div>
  </div>
);
}

export default BestAnswer;