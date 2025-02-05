import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import { fetchMyAnswer, fetchOtherAnswers } from "../../../store/slices/answerSlice";
import MyAnswer from "./MyAnswer";
import OtherAnswers from "./OtherAnswers";
import "./AnswerCommunityComp.css";

type AnswerCommunityCompProps = {
  questionId: number;
};

// const AnswerCommunityComp: React.FC<AnswerCommunityCompProps> = ({ questionId }) => {
//   const dispatch = useAppDispatch();
//   const { myAnswer, otherAnswers, loading, error } = useAppSelector(state => state.answers);

//   useEffect(() => {
//     if (questionId) {
//       dispatch(fetchMyAnswer(questionId));
//       dispatch(fetchOtherAnswers(questionId));
//     }
//   }, [dispatch, questionId]);

//   console.log('questionId:', questionId);
//   console.log('myAnswer:', myAnswer);
//   console.log('otherAnswers:', otherAnswers);

//   if (!questionId) return <div>Invalid question ID</div>;
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="answer-community-container">
//       {myAnswer && <MyAnswer answer={myAnswer} />}
//       <OtherAnswers answers={otherAnswers} />
//     </div>
//   );
// };

// export default AnswerCommunityComp;

const AnswerCommunityComp: React.FC<AnswerCommunityCompProps> = ({ questionId }) => {
  const dispatch = useAppDispatch();
  const { myAnswer, otherAnswers, loading, error } = useAppSelector(state => state.answers);

  // 항상 questionId를 1로 설정
  const fixedQuestionId = questionId;

  useEffect(() => {
    dispatch(fetchMyAnswer(fixedQuestionId));
    dispatch(fetchOtherAnswers(fixedQuestionId));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="answer-community-container">
      {myAnswer && <MyAnswer answer={myAnswer} />}
      {otherAnswers.length > 0 ? (
        <OtherAnswers answers={otherAnswers} />
      ) : (
        <div>No other answers available</div>
      )}
    </div>
  );
};

export default AnswerCommunityComp;