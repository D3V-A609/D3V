import React from "react";

interface QuestionAnswerBtnProps {
  onShowAnswerInput: () => void;
  onShowAnswerCommunity: () => void;
  currentView: "input" | "community";
}

const QuestionAnswerBtnGroup: React.FC<QuestionAnswerBtnProps> = ({
  onShowAnswerInput,
  onShowAnswerCommunity,
  currentView,
}) => {
  return (
    <div className="question-answer-btn-group">
      <div className="btn-question-answer ${currentView === 'input' ? 'active' : ''}`}" onClick={onShowAnswerInput}>
        답변하기
      </div>
      <div
        className={`btn-question-answer-commu ${currentView === 'community' ? 'active' : ''}`}
        onClick={onShowAnswerCommunity}
      >
        답변 보러가기
      </div>
    </div>
  );
};

export default QuestionAnswerBtnGroup;
