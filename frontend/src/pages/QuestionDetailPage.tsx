import React, { useState, useEffect } from 'react';
import "./QuestionDetailPage.css";

import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks/useRedux';

import { fetchQuestionById } from '../store/slices/questionSlice';

import FootPrint from "../assets/images/footprint.png";
import QuestionContentCard from '../components/QuestionDetail/Question/QuestionContentCard';
import QuestionAnswerBtnGroup from '../components/QuestionDetail/Question/QuestionAnswerBtnGroup';
import AnswerInput from '../components/QuestionDetail/Answer/AnswerInput';
import AnswerCommunityComp from '../components/QuestionDetail/Answer/AnswerCommunityComp';
import { fetchAllMyAnswersByQID } from '../store/slices/answerSlice';

const QuestionDetailPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentQuestionDetailView, setQuestionDetailView] = useState<
    "input" | "community"
  >("input");

  // Redux store에서 선택된 질문 ID와 모든 질문 목록 가져오기
  const { selectedQuestionId, questions, dailyQuestions, loading, error } = useAppSelector(
    state => state.questions
  );
  const { myAnswerArr } = useAppSelector(
    state => state.answers
  );
  console.log('questions:', questions)

  // 컴포넌트 마운트 시 질문 상세 데이터를 fetch
  useEffect(() => {
    if (selectedQuestionId !== null) {
      dispatch(fetchQuestionById(selectedQuestionId))
      .unwrap()
        .catch(() => {
          alert("죄송합니다. 잠시 후 다시 시도해주세요.") // question 로드 실패 시 홈으로 리다이렉트  
          navigate('/')
        });  // fetch 실패 시 리다이렉트;
      dispatch(fetchAllMyAnswersByQID(selectedQuestionId))
    }
  }, [dispatch, selectedQuestionId]);  // selectedQuestionId가 변경될 때마다 실행

  
  // 일일 질문인지 확인
  const isTodayQ = dailyQuestions.some(q => q.questionId === selectedQuestionId);

  // 답변 창, 답변 커뮤니티 창 이동함수
  const handleShowAnswerInput = () => {
    if (currentQuestionDetailView !== "input") {
      setQuestionDetailView("input");
    }
  };
  const handleShowCommunity = () => {
    if (currentQuestionDetailView !== "community") {
      setQuestionDetailView("community");
    }
  };

  // 로딩 상태 처리
  if (loading) return <div>Loading...</div>;
  // 에러 상태 처리
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="question-detail-container">
      <div className="question-detail_info-text text-gray2">
        <img 
          src={FootPrint} 
          className="question-detail_footprint-img" 
          alt="footprint"
        />
        <div className="question-detail_info-text text-gray2">
          <img 
            src={FootPrint} 
            className="question-detail_footprint-img" 
            alt="footprint"
          />
          취뽀의 길로 한 발자국 더 !
        </div>
      </div>
      {questions[0] && <>
        <QuestionContentCard question={questions[0]} isToday={isTodayQ} />
        <QuestionAnswerBtnGroup 
          onShowAnswerInput={handleShowAnswerInput} 
          onShowAnswerCommunity={handleShowCommunity}
          currentView={currentQuestionDetailView}
        />

      {currentQuestionDetailView === "input" && <AnswerInput standardAnswer={questions[0].standardAnswer} myAnswers={myAnswerArr} questionId={selectedQuestionId} />}
      {currentQuestionDetailView === "community" && selectedQuestionId !== null && (
        <AnswerCommunityComp questionId={selectedQuestionId} />
      )}
      {/* {currentQuestionDetailView === "community" && (
        <AnswerCommunityComp questionId={1} />
      )} */}
      </>}
      
    </div>
  );
}

export default QuestionDetailPage;

