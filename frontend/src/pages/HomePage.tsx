// Pages/HomePages.tsx
import React from 'react';
import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import './HomePage.css';
import PageHeader from '../components/PageHeader/PageHeader';
import { BsCheckLg } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';

import dummyTodayQuestions from '../constants/dummyTodayQuestions.tsx';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const isLoggedIn = true; // login 상태
  const todayQuestions = dummyTodayQuestions;

  const QuestionCardClick = (question: typeof todayQuestions[0]) => {
    navigate(`/question/${question.id}`, {
      state: {question},
    });
  }

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
    </div>
  );
};

export default HomePage;