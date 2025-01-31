// Pages/HomePages.tsx
import React from 'react';
import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import './HomePage.css';

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