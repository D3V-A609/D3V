import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/useRedux";
import MyAnswer from "./MyAnswer";
import OtherAnswers from "./OtherAnswers";
import Pagination from "../../../Pagination/Pagination";
import "./AnswerCommunityComp.css";
import { AnswerState } from "../../../../store/slices/answerSlice";
import { fetchMyAnswer, fetchOtherAnswers } from "../../../../store/actions/answerActions";

type AnswerCommunityCompProps = {
  questionId: number;
};

const AnswerCommunityComp: React.FC<AnswerCommunityCompProps> = ({ questionId }) => {
  const dispatch = useAppDispatch();
  const { myAnswer, otherAnswers, error } = useAppSelector(state => state.answers as AnswerState);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (questionId) {
      dispatch(fetchMyAnswer(questionId));
      dispatch(fetchOtherAnswers({ questionId, page: currentPage, size: pageSize }));
    }
  }, [dispatch, questionId, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="answer-community-container">
      {myAnswer && <MyAnswer />}
      {otherAnswers && otherAnswers.data && otherAnswers.data.length > 0 ? (
        <>
          <OtherAnswers answers={otherAnswers.data} />
          <Pagination
            currentPage={otherAnswers.pagable.currentPage}
            totalPages={otherAnswers.pagable.totalPages}
            first={otherAnswers.pagable.prevPage === null}
            last={otherAnswers.pagable.nextPage === null}
            onPageChange={handlePageChange}
          />
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
