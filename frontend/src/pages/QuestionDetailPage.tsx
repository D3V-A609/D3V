import React, { useState, useEffect, useRef } from 'react';
import "./QuestionDetailPage.css";

import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks/useRedux';

import {  QuestionState } from '../store/slices/questionSlice';

import FootPrint from "../assets/images/footprint.png";
import QuestionContentCard from '../components/QuestionDetail/Question/QuestionContentCard';
import QuestionAnswerBtnGroup from '../components/QuestionDetail/Question/QuestionAnswerBtnGroup';
import AnswerInput from '../components/QuestionDetail/Answer/Input/AnswerInput';
import AnswerCommunityComp from '../components/QuestionDetail/Answer/Community/AnswerCommunityComp';
import { AnswerState } from '../store/slices/answerSlice';
import { fetchAllMyAnswersByQID } from '../store/actions/answerActions';
import { fetchQuestionById } from '../store/actions/questionActions';
import { useRecordingContext } from '../context/RecordingContext';
import RecordView from '../features/VoiceRecording/RecordView';
import { useAiModal } from '../context/AiModalContext';
import AIFeedbackModal from '../features/Answer/AIFeedbackModal';

const QuestionDetailPage: React.FC = () => {
  const { isRecordingMode } = useRecordingContext();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {isAiModalOpen} = useAiModal();

  const [currentQuestionDetailView, setQuestionDetailView] = useState<"input" | "community">("input");

  // Redux store에서 선택된 질문 ID와 모든 질문 목록 가져오기
  const { selectedQuestionId, question, dailyQuestions, error } = useAppSelector(
    state => state.questions as QuestionState // 타입 단언문 사용
  );
  const { myAnswerArr } = useAppSelector(state => state.answers as AnswerState);

  const hasFetched = useRef(false);

  // 컴포넌트 마운트 시 질문 상세 데이터를 fetch
  useEffect(() => {
    if (selectedQuestionId !== null && !hasFetched.current) {
      hasFetched.current = true;
      Promise.all([
        dispatch(fetchQuestionById(selectedQuestionId))
        .unwrap()
          .catch(() => {
            alert("죄송합니다. 잠시 후 다시 시도해주세요.") // question 로드 실패 시 홈으로 리다이렉트  
            navigate('/')
          }), // fetch 실패 시 리다이렉트;
        dispatch(fetchAllMyAnswersByQID(selectedQuestionId))
      ])
    }
  }, [dispatch, selectedQuestionId]);  // selectedQuestionId가 변경될 때마다 실행

  
  // 일일 질문인지 확인
  const isTodayQ = dailyQuestions.some(q => q.id === selectedQuestionId);

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

  // location.state 값 확인하고 커뮤니티 탭 자동 활성화
  useEffect(() => {
    if (location.state?.showCommunity) {
      setQuestionDetailView("community"); // 커뮤니티 탭으로 변경
    }
  }, [location.state]);

  // 에러 상태 처리
  if (error) return <div>Error: {error}</div>;
  
  return (
    <>
    {isRecordingMode ? <RecordView content={question? question.content : 'Q'}  /> :  
 
  
    <div className="question-detail-container">
      <div className="question-detail_info-text text-gray2">
        <div className="question-detail_info-text text-gray2">
          <img 
            src={FootPrint} 
            className="question-detail_footprint-img" 
            alt="footprint"
          />
          취뽀의 길로 한 발자국 더 !
        </div>
      </div>
      {question && <>
        <QuestionContentCard question={question} isToday={isTodayQ} />
        <QuestionAnswerBtnGroup 
          onShowAnswerInput={handleShowAnswerInput} 
          onShowAnswerCommunity={handleShowCommunity}
          currentView={currentQuestionDetailView}
        />

      {currentQuestionDetailView === "input" && <AnswerInput hasMyAnswers={question.status} standardAnswer={question.standardAnswer} myAnswers={myAnswerArr} questionId={selectedQuestionId} />}
      {currentQuestionDetailView === "community" && selectedQuestionId !== null && (
        <AnswerCommunityComp questionId={selectedQuestionId} />
      )}

      </>}

      {isAiModalOpen && <AIFeedbackModal question={question? question.content : ""}/>}
      
    </div>
    }</>
  );
}

export default QuestionDetailPage;

