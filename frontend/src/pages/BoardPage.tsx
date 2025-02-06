// Pages/BoardPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { fetchDailyQuestions, setSelectedQuestionId } from '../store/slices/questionSlice';
import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import PageHeader from '../components/PageHeader/PageHeader';
import { BsCheckLg, BsChatSquareText } from 'react-icons/bs';
import './BoardPage.css';

const BoardPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dailyQuestions, loading, error } = useAppSelector((state) => state.questions as QuestionState);
  const isLoggedIn = true;

  useEffect(() => {
    dispatch(fetchDailyQuestions());
  }, [dispatch]);

  const QuestionCardClick = (questionId: number) => {
    dispatch(setSelectedQuestionId(questionId));
    navigate('/question');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="board-page">
      <section className="today-question-section">
        <PageHeader 
          title="오늘의 면접 질문"
          description="D3V's pick"
          icon={<BsCheckLg />}
          iconStyle="yellow-check-icon"
        />
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
