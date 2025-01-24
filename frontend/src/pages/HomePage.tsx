// Pages/HomePages.tsx
import React from 'react';
import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import './HomePage.css';

const HomePage: React.FC = () => {
  const todayQuestions = [
    {
      title: "React에서 가상 DOM이 어떻게 작동하는지 설명하세요.",
      category: "React"
    },
    {
      title: "JavaScript의 클로저란 무엇이며 어떻게 사용하나요? JavaScript의 클로저란 무엇이며 어떻게 사용하나요? JavaScript의 클로저란 무엇이며 어떻게 사용하나요?",
      category: "JavaScript"
    },
    {
      title: "반응형 웹 디자인의 핵심 원칙은 무엇인가요?",
      category: "HTML"
    }
  ];

  return (
    <div className="home-page">
      <section className="today-questions">
        <div className="question-cards">
          {todayQuestions.map((question, index) => (
            <TodayQuestionCard
              key={index}
              title={question.title}
              category={question.category}
              onClick={() => console.log(`Clicked question ${index}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
