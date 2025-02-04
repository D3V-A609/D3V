// Pages/BoardPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { fetchDailyQuestions } from '../store/slices/dailyQuestionSlice';
import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import PageHeader from '../components/PageHeader/PageHeader';
import { BsCheckLg, BsChatSquareText } from 'react-icons/bs';
import './BoardPage.css';

/**
 * 게시판 페이지 컴포넌트
 * 오늘의 면접 질문과 자유 게시판 섹션을 포함
 */
const BoardPage: React.FC = () => {
  // 라우터 네비게이션을 위한 훅
  const navigate = useNavigate();
  // Redux dispatch 함수
  const dispatch = useAppDispatch();
  // Redux store에서 일일 질문 관련 상태를 가져옴
  const { dailyQuestions, loading, error } = useAppSelector((state) => state.dailyQuestions);
  // 로그인 상태 관리 (추후 실제 인증 로직으로 대체 필요)
  const isLoggedIn = true;

  // 컴포넌트 마운트 시 일일 질문 데이터 fetch
  useEffect(() => {
    dispatch(fetchDailyQuestions());
  }, [dispatch]);

  /**
   * 질문 카드 클릭 핸들러
   * @param question 선택된 질문 객체
   */
  const QuestionCardClick = (question: Question) => {
    navigate(`/question/${question.questionId}`, {
      state: { question },
    });
  };

  // 로딩 상태 처리
  if (loading) return <div>Loading...</div>;
  // 에러 상태 처리
  if (error) return <div>Error: {error}</div>;

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
          {/* 질문 데이터를 매핑하여 카드 컴포넌트로 렌더링 */}
          {dailyQuestions.map((question) => (
            <TodayQuestionCard
              key={question.questionId}
              title={question.content}
              category={question.skillList[0]} // 직무 목록을 문자열로 결합
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
