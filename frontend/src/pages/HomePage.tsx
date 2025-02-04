// Pages/HomePage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { fetchDailyQuestions } from '../store/slices/dailyQuestionSlice';
import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import PageHeader from '../components/PageHeader/PageHeader';
import { BsCheckLg } from 'react-icons/bs';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Redux store에서 일일 질문 관련 상태를 가져옴
  const { dailyQuestions, loading, error } = useAppSelector((state) => state.dailyQuestions);
  // 로그인 상태 (추후 실제 인증 상태로 대체 예정)
  const isLoggedIn = true;

  // 컴포넌트 마운트 시 일일 질문 데이터 fetch
  useEffect(() => {
    dispatch(fetchDailyQuestions());
  }, [dispatch]);

  // 질문 카드 클릭 시 상세 페이지로 이동하는 핸들러
  const QuestionCardClick = (question: Question) => {
    navigate(`/question/${question.questionId}`, {
      state: { question }, // 질문 데이터를 라우터 state로 전달
    });
  };

  // 로딩 상태 처리
  if (loading) return <div>Loading...</div>;
  // 에러 상태 처리
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-page">
      {/* 페이지 헤더 섹션 */}
      <PageHeader 
        title="오늘의 면접 질문"
        description="D3V's pick"
        icon={<BsCheckLg />}
        iconStyle="yellow-check-icon"
      />
      {/* 질문 카드 목록 섹션 */}
      <section className="today-questions">
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
    </div>
  );
};

export default HomePage;

