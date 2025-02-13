import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux'
import { QuestionState, setSelectedQuestionId } from '../store/slices/questionSlice';
import { fetchDailyQuestions, fetchTop10Questions  } from '../store/actions/questionActions';
import TodayQuestionCard from '../components/TodayQuestionCard/TodayQuestionCard';
import Top10QuestionCard from '../components/Top10/Top10QuestionCard';
import Top10Filter from '../components/Top10/Top10Filter';
import PageHeader from '../components/PageHeader/PageHeader';
import { BsFillTrophyFill, BsFillCalendarCheckFill } from "react-icons/bs";
import './HomePage.css';
import LoadingPage from '../components/ErrorHandling/LoadingPage';
import ErrorPage from '../components/ErrorHandling/ErrorPage';
import { format, subMonths } from 'date-fns';
import { fetchJobs } from '../store/actions/jobActions';

type JobType = string;

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<JobType>('FRONTEND');
  const [jobCategories, setJobCategories] = useState<{ [key: string]: string }>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { 
    dailyQuestions, 
    top10Questions,
    loading, 
    error 
  } = useAppSelector((state) => state.questions as QuestionState);
  
  const isLoggedIn = true;

  const getPreviousMonth = () => {
    return format(subMonths(new Date(), 1), 'yyyy-MM');
  };

  useEffect(() => {
    dispatch(fetchDailyQuestions());
  }, [dispatch]);

  useEffect(() => {
    const previousMonth = getPreviousMonth();
    dispatch(fetchTop10Questions({
      month: previousMonth,
      job: selectedJob,
    }));
  }, [dispatch, selectedJob]);

  useEffect(() => {
    dispatch(fetchJobs())
      .unwrap()
      .then((jobs: JobType[]) => {
        const formattedJobs = jobs.reduce((acc, job) => {
          acc[job] = job.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
          return acc;
        }, {} as { [key: string]: string });
        setJobCategories(formattedJobs);
      })
      .catch((error) => console.error('Failed to fetch jobs:', error));
  }, [dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedJob]);  

  const QuestionCardClick = (id: number) => {
    dispatch(setSelectedQuestionId(id));
    navigate(`/question`);
  };

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage message='예상치 못한 에러가 발생했습니다. 잠시 후 다시 시도해주세요' />;

  return (
    <div className="home-page" ref={scrollRef}>
      <PageHeader 
        title="오늘의 면접 질문"
        description="D3V's pick"
        icon={<BsFillCalendarCheckFill />}
        iconStyle="check-icon"
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

      <section className="top10-section">
        <div className="section-header">
          <PageHeader           
            title={`${jobCategories[selectedJob] || selectedJob} 주간 TOP 10`}
            icon={<BsFillTrophyFill />}
            iconStyle="trophy-icon"
          />
        </div>
        <Top10Filter 
          selectedJob={selectedJob} 
          onJobChange={setSelectedJob} 
          jobCategories={jobCategories} 
        />
        <button
          className="more-button"
          onClick={() =>
            navigate('/all-questions', { 
              state: { initialJobFilter: [selectedJob] },
              replace: true 
            })
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
