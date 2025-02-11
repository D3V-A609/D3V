// Pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux'
import { QuestionState, setSelectedQuestionId } from '../store/slices/questionSlice';
import { fetchDailyQuestions, fetchTop10Questions  } from '../store/actions/questionActions';
import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import Top10QuestionCard from '../components/Top10/Top10QuestionCard';
import Top10Filter from '../components/Top10/Top10Filter';
import PageHeader from '../components/PageHeader/PageHeader';
import { BsCheckLg, BsTrophy} from 'react-icons/bs';
import './HomePage.css';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<string[]>(['Front-end']);
  
  const { 
    dailyQuestions, 
    top10Questions,
    loading, 
    error 
  } = useAppSelector((state) => state.questions as QuestionState);
  
  const isLoggedIn = true;

  useEffect(() => {
    dispatch(fetchDailyQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (selectedJob.length > 0) {
      // Front-end -> FRONTEND로 변환
      const formattedJob = selectedJob[0].toUpperCase().replace('-', '');
      
      dispatch(fetchTop10Questions({
        month: '2025-01', // 현재가 2025-02이므로 지난달인 2025-01로 설정
        job: formattedJob
      }));
    }
  }, [dispatch, selectedJob]);
  
  

  const QuestionCardClick = (id: number) => {
    dispatch(setSelectedQuestionId(id));
    navigate(`/question`);
  };

  if (loading) return <div>Loading...</div>;
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
              key={question.id}
              title={question.content}
              category={question.skillList?.[0] || 'General'}
              isLoggedIn={isLoggedIn}
              onClick={() => QuestionCardClick(question.id)}
            />
          ))}
        </div>
      </section>

      {/* Top 10 섹션 */}
      <section className="top10-section">
        <div className="section-header">
          <div className="title-wrapper">
            <BsTrophy className="gold-trophy-icon" />
            <div className="job-badge">{selectedJob[0]}</div>
            <h2>주간 TOP 10</h2>
          </div>
        </div>
        <Top10Filter jobFilter={selectedJob} onJobFilterChange={setSelectedJob} />
        <button
          className="more-button"
          onClick={() =>
            navigate('/all-questions', { state: { selectedJob: selectedJob[0] } })
          }
        >
          더보기
        </button>
        <div className="cards-container">
          <div className="cards-wrapper">
            {top10Questions.map((question) => (
              <Top10QuestionCard
                key={question.id}
                title={question.content}
                category={question.skillList[0]}
                onClick={() => QuestionCardClick(question.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;