import React from "react";
import MyAnswer from "./MyAnswer";
import OtherAnswers from "./OtherAnswers";
import dummyMyAnswer from "../../../constants/dummyMyAnswer";
import dummyOtherAnswers from "../../../constants/dummyOtherAnswers";
import "./AnswerCommunityComp.css";

const AnswerCommunityComp: React.FC = () => {
  return (
    <div className="answer-community-container">
      <MyAnswer answer={dummyMyAnswer} />
      <OtherAnswers answers={dummyOtherAnswers} />
    </div>
  );
};

export default AnswerCommunityComp;