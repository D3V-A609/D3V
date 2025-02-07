// Pages/HomePage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux'
import { QuestionState, setSelectedQuestionId } from '../store/slices/questionSlice';
import { fetchDailyQuestions  } from '../store/actions/questionActions';
import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import PageHeader from '../components/PageHeader/PageHeader';
import { BsCheckLg } from 'react-icons/bs';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { dailyQuestions, error } = useAppSelector(
    (state) => state.questions as QuestionState
  );

  console.log(dailyQuestions)
  // 로그인 상태 (추후 실제 인증 상태로 대체 예정)
  const isLoggedIn = true;
  // const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDailyQuestions());
  }, [dispatch]);

  const QuestionCardClick = (id: number) => {
    dispatch(setSelectedQuestionId(id));
    navigate(`/question`);
  };

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
              key={question.question.id}
              title={question.question.content}
              category={question.skillList[0]}
              isLoggedIn={isLoggedIn}
              onClick={() => QuestionCardClick(question.question.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;