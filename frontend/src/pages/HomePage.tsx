// Pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { fetchDailyQuestions, fetchTop10Questions, setSelectedQuestionId } from '../store/slices/questionSlice';
import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import Top10QuestionCard from '../components/Top10/Top10QuestionCard';
import Top10Filter from '../components/Top10/Top10Filter';
import PageHeader from '../components/PageHeader/PageHeader';
import { BsCheckLg, BsTrophy} from 'react-icons/bs';
import './HomePage.css';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<string[]>(['Front-end']); // 기본값 설정
  // Redux store에서 일일 질문 관련 상태를 가져옴
  const { 
    dailyQuestions, 
    top10Questions,
    loading, 
    error 
  } = useAppSelector((state) => state.questions);
  // 로그인 상태 (추후 실제 인증 상태로 대체 예정)
  const isLoggedIn = true;

  // 컴포넌트 마운트 시 일일 질문 데이터 fetch
  useEffect(() => {
    dispatch(fetchDailyQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (selectedJob.length > 0) {
      dispatch(fetchTop10Questions({
        month: new Date().toISOString().slice(0, 7),
        job: selectedJob[0]
      }));
    }
  }, [dispatch, selectedJob]);

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

      {/* Top 10 섹션 */}
      <section className="top10-section">
        <PageHeader 
          title={`${selectedJob[0]} 주간 TOP 10`}
          description="이번 주 가장 많이 도전한 질문"
          icon={<BsTrophy />}
          iconStyle="gold-trophy-icon"
        />
        <Top10Filter
          jobFilter={selectedJob}
          onJobFilterChange={setSelectedJob}
        />
        <div className="question-cards">
          {top10Questions.map((question) => (
            <Top10QuestionCard
              key={question.questionId}
              title={question.content}
              category={question.skillList[0]}
              onClick={() => QuestionCardClick(question.questionId)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
