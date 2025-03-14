import React from 'react';

import ThugUpImg from "../../assets/images/Thumbs-Up.png";

interface BestAnswerProps {
  bestAnswer: string;
}

const BestAnswer:React.FC<BestAnswerProps> = ({bestAnswer}) => {
  return (
  <div >
    <div className="best-answer-container">
          <div className="best-answer-title">
            <img src={ThugUpImg} alt="thug-up-img" style={{width: '35px', height: '35px'}} loading="lazy" />
            해설 
          </div>
          <div className="best-answer-content">
            <div className="answer-label">A.</div>
            <div className="answer-text">{bestAnswer}</div>
          </div>
        </div>
  </div>
);
}

export default BestAnswer;