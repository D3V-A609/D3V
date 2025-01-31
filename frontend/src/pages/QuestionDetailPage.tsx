import React from 'react';
import "./QuestionDetailPage.css";

import { useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';

import FootPrint from "../assets/images/footprint.png";
import QuestionContentCard from '../components/QuestionDetail/Question/QuestionContentCard';

import { Question } from '../types/question';
import QuestionAnswerBtnGroup from '../components/QuestionDetail/Question/QuestionAnswerBtnGroup';

import AnswerInputComp from '../components/QuestionDetail/Answer/AnswerInputComp';
import AnswerCommunityComp from '../components/QuestionDetail/Answer/AnswerCommunityComp';

const QuestionDetailPage: React.FC = () => {
  const [currentQuestionDetailView, setQuestionDetailView] = useState<
    "input" | "community"
  >("input");

  const location = useLocation();
  const question = location.state?.question as Partial<Question> | undefined;
  const isTodayQ = question? true: false; // today 질문인지 여부 확인

  // 만약 직접 URL을 입력해서 접근했다면, 홈으로 리디렉션
  if(!question){
    return <Navigate to="/" />;
  }

  // 버튼 클릭 시 호출할 함수들 정의
  // => 답변 입력 컴포넌트(default)
  const handleShowAnswerInput = () => {
    if (currentQuestionDetailView !== "input") {
      setQuestionDetailView("input");
    }
  };
  // => 답변 커뮤니티 컴포넌트
  const handleShowCommunity = () => {
    if (currentQuestionDetailView !== "community") {
      setQuestionDetailView("community");
    }
  };
  
  return(
    <div className="question-detail-container">
      <div className="question-detail_info-text  text-gray2">
        <img src={FootPrint} className="question-detail_footprint-img" />
        취뽀의 길로 한 발자국 더 !
      </div>
      <QuestionContentCard question={question} isToday={isTodayQ} />
      <QuestionAnswerBtnGroup onShowAnswerInput={handleShowAnswerInput} onShowAnswerCommunity={handleShowCommunity} />

      {/* 조건부 렌더링 */}
      {currentQuestionDetailView === "input" && <AnswerInputComp />}
      {currentQuestionDetailView === "community" && <AnswerCommunityComp />}
    </div>
  );
}

export default QuestionDetailPage;