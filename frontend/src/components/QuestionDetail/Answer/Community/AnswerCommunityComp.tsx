import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/useRedux";
import MyAnswer from "./MyAnswer";
import OtherAnswers from "./OtherAnswers";
import "./AnswerCommunityComp.css";
import { AnswerState } from "../../../../store/slices/answerSlice";
import { fetchMyAnswer, fetchOtherAnswers } from "../../../../store/actions/answerActions";
import { fetchMultipleUserInfo } from "../../../../store/actions/userActions";

type AnswerCommunityCompProps = {
  questionId: number;
};

const AnswerCommunityComp: React.FC<AnswerCommunityCompProps> = ({ questionId }) => {
  const dispatch = useAppDispatch();
  const { myAnswer, otherAnswers, error } = useAppSelector(state => state.answers as AnswerState);
  const pageSize = 10;

  useEffect(() => {
    if (questionId) {
      dispatch(fetchMyAnswer(questionId));
      dispatch(fetchOtherAnswers({ questionId, page: 1, size: pageSize }))
        .then((action) => {
          if (fetchOtherAnswers.fulfilled.match(action)) {
            const uniqueMemberIds = [...new Set([
              ...action.payload.data.map(answer => answer.memberId),
              ...(myAnswer?.memberId ? [myAnswer.memberId] : [])
            ])];
            dispatch(fetchMultipleUserInfo(uniqueMemberIds));
          }
        });
    }
  }, [dispatch, questionId]);
  
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="answer-community-container">
      {myAnswer && <MyAnswer />}
      {otherAnswers && otherAnswers.data && otherAnswers.data.length > 0 ? (
        <>
          <OtherAnswers answers={otherAnswers.data} />
        </>
      ) : (
        <div className="no-answers-message">
          아직 다른 사람들이 답변을 달지 않았어요!
        </div>
      )}
    </div>
  );
};

export default AnswerCommunityComp;
