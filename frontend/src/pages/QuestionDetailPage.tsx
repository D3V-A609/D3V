// src/pages/QuestionDetailPage.tsx
import React from 'react';
import "./QuestionDetailPage.css";
import { useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';
import FootPrint from "../assets/images/footprint.png";
import QuestionContentCard from '../components/QuestionDetail/Question/QuestionContentCard';
import QuestionAnswerBtnGroup from '../components/QuestionDetail/Question/QuestionAnswerBtnGroup';
import AnswerInput from '../components/QuestionDetail/Answer/AnswerInput';
import AnswerCommunityComp from '../components/QuestionDetail/Answer/AnswerCommunityComp';

const QuestionDetailPage: React.FC = () => {
  const [currentQuestionDetailView, setQuestionDetailView] = useState<
    "input" | "community"
  >("input");

  const location = useLocation();
  const question = location.state?.question as Question | undefined;
  const isTodayQ = question ? true : false;

  // 만약 직접 URL을 입력해서 접근했다면, 홈으로 리디렉션
  if (!question) {
    return <Navigate to="/" />;
  }

  // 버튼 클릭 시 호출할 함수들 정의
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

  const testQuestionId = 2;
  
  return (
    <div className="question-detail-container">
      <div className="question-detail_info-text  text-gray2">
        <img src={FootPrint} className="question-detail_footprint-img" alt="footprint" />
        취뽀의 길로 한 발자국 더 !
      </div>
      <QuestionContentCard question={question} isToday={isTodayQ} />
      <QuestionAnswerBtnGroup 
        onShowAnswerInput={handleShowAnswerInput} 
        onShowAnswerCommunity={handleShowCommunity} 
      />

      {/* 조건부 렌더링 - questionId 전달 */}
      {currentQuestionDetailView === "input" && <AnswerInput />}
      {currentQuestionDetailView === "community" && (
        <AnswerCommunityComp questionId={testQuestionId} />
      )}
    </div>
  );
};

export default QuestionDetailPage;
