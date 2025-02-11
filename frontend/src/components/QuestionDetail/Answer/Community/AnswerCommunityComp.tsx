import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/useRedux";
import MyAnswer from "../Community/MyAnswer";
import OtherAnswers from "../Community/OtherAnswers";
import "./AnswerCommunityComp.css";
import { AnswerState } from "../../../../store/slices/answerSlice";
import { fetchMyAnswer, fetchOtherAnswers } from "../../../../store/actions/answerActions";

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
  const { myAnswer, otherAnswers, loading, error } = useAppSelector(state => state.answers as AnswerState);

  useEffect(() => {
    dispatch(fetchMyAnswer(questionId));
    dispatch(fetchOtherAnswers(questionId));
  }, [dispatch, questionId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="answer-community-container">
      {myAnswer && <MyAnswer />  } 
      {otherAnswers.length > 0 ? (
        <OtherAnswers answers={otherAnswers} />
      ) : (
        <div className="no-answers-message">
          아직 다른 사람들이 답변을 달지 않았어요!
        </div>
      )}
    </div>
  );
};


export default AnswerCommunityComp;