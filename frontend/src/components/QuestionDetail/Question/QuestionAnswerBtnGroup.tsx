import React from "react";

interface QuestionAnswerBtnProps {
  onShowAnswerInput: () => void;
  onShowAnswerCommunity: () => void;
}

const QuestionAnswerBtnGroup: React.FC<QuestionAnswerBtnProps> = ({
  onShowAnswerInput,
  onShowAnswerCommunity,
}) => {
  return (
    <div className="question-answer-btn-group">
      <div className="btn-question-answer" onClick={onShowAnswerInput}>
        답변하기
      </div>
      <div
        className="btn-question-answer-commu"
        onClick={onShowAnswerCommunity}
      >
        답변 보러가기
      </div>
    </div>
  );
};

export default QuestionAnswerBtnGroup;
