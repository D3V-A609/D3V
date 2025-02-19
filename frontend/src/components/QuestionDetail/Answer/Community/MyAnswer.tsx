import React from 'react';
import { BsChatSquareQuote } from "react-icons/bs";
import "./MyAnswer.css";
import { useAppSelector } from '../../../../store/hooks/useRedux';
import { AnswerState } from '../../../../store/slices/answerSlice';
import PageHeader from '../../../PageHeader/PageHeader';

const MyAnswer: React.FC = () => {
  const { myAnswerArr } = useAppSelector(state => state.answers as AnswerState);

  // 가장 최근 답변을 가져옵니다.
  const recentAnswer = myAnswerArr.length > 0 ? myAnswerArr[myAnswerArr.length - 1] : null;

  if (!recentAnswer) return null; // 답변이 없으면 null 반환

  return (
    <div className="my-answer-container">
      <PageHeader 
        title="내 답변"
        // description="D3V's pick"
        icon={<BsChatSquareQuote />}
        iconStyle="chat-quote"
      />
      {/* <div className="answer-title">
        <FcViewDetails className="study-icon" size={24} />
          내 답변
      </div> */}
      <div className="my-answer-content">
        <div className="answer-label">A.</div>
        <div className="answer-text">{recentAnswer.content === "IDK" ? "모르겠어요":recentAnswer.content}</div>
      </div>
    </div>
  );
};

export default MyAnswer;
