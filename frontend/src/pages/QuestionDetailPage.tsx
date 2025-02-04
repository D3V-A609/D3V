import React, { useState } from 'react';
import "./QuestionDetailPage.css";
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks/useRedux';
import FootPrint from "../assets/images/footprint.png";
import QuestionContentCard from '../components/QuestionDetail/Question/QuestionContentCard';
import QuestionAnswerBtnGroup from '../components/QuestionDetail/Question/QuestionAnswerBtnGroup';
import AnswerInput from '../components/QuestionDetail/Answer/AnswerInput';
import AnswerCommunityComp from '../components/QuestionDetail/Answer/AnswerCommunityComp';

const QuestionDetailPage: React.FC = () => {
  const [currentQuestionDetailView, setQuestionDetailView] = useState<
    "input" | "community"
  >("input");

  // Redux store에서 선택된 질문 ID와 모든 질문 목록 가져오기
  const { selectedQuestionId, questions, dailyQuestions } = useAppSelector(
    state => state.questions
  );

  // selectedQuestionId를 사용하여 모든 질문 목록에서 해당 질문 찾기
  const question = [...questions, ...dailyQuestions].find(
    q => q.questionId === selectedQuestionId
  );
  
  // 일일 질문인지 확인
  const isTodayQ = dailyQuestions.some(q => q.questionId === selectedQuestionId);

  // 선택된 질문이 없으면 홈으로 리디렉션
  if (!selectedQuestionId || !question) {
    return <Navigate to="/" />;
  }

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
  
  return (
    <div className="question-detail-container">
      <div className="question-detail_info-text text-gray2">
        <img 
          src={FootPrint} 
          className="question-detail_footprint-img" 
          alt="footprint"
        />
        취뽀의 길로 한 발자국 더 !
      </div>
      <QuestionContentCard question={question} isToday={isTodayQ} />
      <QuestionAnswerBtnGroup 
        onShowAnswerInput={handleShowAnswerInput} 
        onShowAnswerCommunity={handleShowCommunity} 
      />

      {currentQuestionDetailView === "input" && <AnswerInput />}
      {currentQuestionDetailView === "community" && <AnswerCommunityComp />}
    </div>
  );
}

export default QuestionDetailPage;
