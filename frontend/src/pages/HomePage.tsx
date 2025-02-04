// Pages/HomePage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { fetchDailyQuestions, setSelectedQuestionId } from '../store/slices/questionSlice';
import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import PageHeader from '../components/PageHeader/PageHeader';
import { BsCheckLg } from 'react-icons/bs';
import './HomePage.css';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Redux store에서 일일 질문 관련 상태를 가져옴
  const { dailyQuestions, loading, error } = useAppSelector((state) => state.questions);
  // 로그인 상태 (추후 실제 인증 상태로 대체 예정)
  const isLoggedIn = true;

  // 컴포넌트 마운트 시 일일 질문 데이터 fetch
  useEffect(() => {
    dispatch(fetchDailyQuestions());
  }, [dispatch]);

  // 질문 카드 클릭 시 선택된 질문 ID를 저장하는 핸들러
  const QuestionCardClick = (questionId: number) => {
    dispatch(setSelectedQuestionId(questionId));
    navigate('/question');
  };

  // 로딩 상태 처리
  if (loading) return <div>Loading...</div>;
  // 에러 상태 처리
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-page">
      <PageHeader 
        title="오늘의 면접 질문"
        description="D3V's pick"
        icon={<BsCheckLg />}
        iconStyle="yellow-check-icon"
      />
      <section className="today-questions">
        <div className="question-cards">
          {dailyQuestions.map((question) => (
            <TodayQuestionCard
              key={question.questionId}
              title={question.content}
              category={question.skillList[0]}
              isLoggedIn={isLoggedIn}
              onClick={() => QuestionCardClick(question.questionId)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
