import React, { useEffect, useState, useRef, useCallback } from 'react';
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
// import LoadingPage from '../components/ErrorHandling/LoadingPage';
import ErrorPage from '../components/ErrorHandling/ErrorPage';
import { format, subMonths } from 'date-fns';
import { fetchJobs } from '../store/actions/jobActions';
import serviceInfo from "../assets/images/service-info.png";
import serviceScreen from "../assets/images/service-screen.png";
import { shallowEqual } from 'react-redux';
import { throttle } from 'lodash';

type JobType = string;

const TodayQuestionCardMemo = React.memo(TodayQuestionCard);
const Top10QuestionCardMemo = React.memo(Top10QuestionCard);

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<JobType>('FRONTEND');
  const [jobCategories, setJobCategories] = useState<{ [key: string]: string }>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { 
    dailyQuestions, 
    top10Questions, 
    error 
  } = useAppSelector((state) => state.questions as QuestionState, shallowEqual);
  
  const { isAuthenticated } = useAppSelector((state) => state.auth, shallowEqual);

  const getPreviousMonth = useCallback(() => format(subMonths(new Date(), 1), 'yyyy-MM'), []);

  const hasFetched = useRef(false);

  const saveScrollPosition = useCallback(
    throttle(() => {
      sessionStorage.setItem('scrollPosition', window.pageYOffset.toString());
    }, 500), // 500ms마다 실행
    []
  );

  // 스크롤 위치 저장 및 복원
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }

    window.addEventListener('scroll', saveScrollPosition);
    return () => window.removeEventListener('scroll', saveScrollPosition);
  }, [saveScrollPosition]);
  
  // api 병렬 요청으로 api 중복 호출을 막고, 최적화함
  // 초기 로딩 시 최조 한번만 실행행
  useEffect(() => {
    if(!hasFetched.current){
      hasFetched.current = true;
      Promise.all([
        dispatch(fetchDailyQuestions()),
        dispatch(fetchJobs()).unwrap().then((jobs: JobType[]) => {
          setJobCategories(jobs.reduce((acc, job) => {
            acc[job] = job.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
            return acc;
          }, {} as { [key: string]: string }));
        }).catch((error) => console.error('Failed to fetch jobs:', error))
      ])
    }
  }, [dispatch])

  // selectedJob 변경 시 실행
  useEffect(() => {
    dispatch(fetchTop10Questions({
      month: getPreviousMonth(),
      job: selectedJob,
    }));
  }, [dispatch, selectedJob, getPreviousMonth]);

  // 질문 상세 페이지 이동 함수(useCallback)
  const QuestionCardClick = useCallback((id: number) => {
    dispatch(setSelectedQuestionId(id));
    navigate(`/question`);
  }, [dispatch, navigate])

  // if (loading) return <LoadingPage />;
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
        {!isAuthenticated && <span className="unlogin-text --unLogined">로그인 후 사용해주세요.</span>}
        <div className={`question-cards ${isAuthenticated? "" : "--unLogined"}`}>
          {Array.isArray(dailyQuestions) && dailyQuestions.map((question) => (
            <TodayQuestionCardMemo
              key={question.id}
              title={question.content}
              category={question.skillList?.[0] || 'General'}
              status={question.status}
              onClick={() => QuestionCardClick(question.id)}
            />
          ))}
        </div>
      </section>

      {!isAuthenticated && (
        <>
        <br />
        <hr style={{width: '80%', color: '#CEC7C7', opacity: '0.3' }}/>
        <section className='unlogin-info-section-1'>
          <h3> 여러 개발 직무와 기술 Skill에 맞는</h3>
          <h3>개발자 면접 질문과 답변들을 한눈에 확인해보세요!</h3>
          <br />
          <img src={serviceInfo} className='unlogin-service-info-img-1'/>
        </section>
        <br />
        <section className='unlogin-info-section-2'>
          <div className='service-info'>
            <div className='service-info-img'>
              <img src={serviceScreen} className='unlogin-service-info-img-2' />
            </div>
            <div className='service-info-text'>
              <h4 style={{margin: 0}}>개발자에게 꼭 필요한 지식!</h4>
              <p style={{margin: 0}}>개발 직무와 기술 스택에 맞는 면접 질문과 답변으로 </p>
              <p style={{margin: 0}}>취뽀의 길에 함께 한 발자국 더 나아가요 ~ 😊</p>
              <div className='service-info-text-div'>
                000개 이상의 개발자를 위한 면접 질문과 다양한 답변!
              </div>
              <div className='service-info-text-div'>
                다양한 직무의 사용자들과 지식 통찰 및 공유
              </div>
            </div>
          </div>
        </section>
        </>
      )}

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
          {Array.isArray(top10Questions) && top10Questions.length > 0 ? (
            top10Questions.map((question) => (
              <Top10QuestionCardMemo
                key={question.id}
                title={question.content}
                category={question.skillList[0] || ''}
                onClick={() => QuestionCardClick(question.id)}
              />
            ))
          ) : (
            <p>No questions available.</p>
          )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
