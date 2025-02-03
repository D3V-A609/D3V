// Pages/HomePages.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import PageHeader from '../components/PageHeader/PageHeader';
import { BsCheckLg, BsChatSquareText } from 'react-icons/bs'; // 체크와 채팅 아이콘 import

import './BoardPage.css'

import dummyTodayQuestions from '../constants/dummyTodayQuestions.tsx';

/**
 * 게시판 페이지 컴포넌트
 * 오늘의 면접 질문과 자유 게시판 섹션을 포함
 */
const BoardPage: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = true; // 로그인 상태 관리 (추후 실제 인증 로직으로 대체 필요)
  const todayQuestions = dummyTodayQuestions;

  /**
   * 질문 카드 클릭 핸들러
   * @param question 선택된 질문 객체
   */
  const QuestionCardClick = (question: typeof todayQuestions[0]) => {
    navigate(`/question/${question.id}`, {
      state: {question},
    });
  }

  return (
    <div className="board-page">
      {/* 오늘의 면접 질문 섹션 */}
      <section className="today-question-section">
        <PageHeader 
          title="오늘의 면접 질문"
          description="D3V's pick"
          icon={<BsCheckLg />}
          iconStyle="yellow-check-icon"
        />
        <div className="question-cards">
          {todayQuestions.map((question) => (
            <TodayQuestionCard
              key={question.id}
              title={question.questionContent}
              category={question.category}
              isLoggedIn={isLoggedIn}
              onClick={() => QuestionCardClick(question)}
            />
          ))}
        </div>
      </section>

      {/* 자유 게시판 섹션 */}
      <section className="board-section">
        <PageHeader 
          title="자유 게시판"
          description="다양한 의견과 글을 자유롭게 게시하고 공유해주세요!"
          icon={<BsChatSquareText />}
          iconStyle="pink-chat-icon"
        />
      </section>
    </div>
  );
};

export default BoardPage;
