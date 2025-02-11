// pages/AllQuestionPage.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { fetchQuestions } from '../store/actions/questionActions';
import { fetchJobs, fetchSkillsByJobs } from '../store/actions/jobActions';
import { QuestionState } from '../store/slices/questionSlice';
import PageHeader from "../components/PageHeader/PageHeader"
import QuestionList from '../features/QuestionList/QuestionList';
import JobSkillFilter from '../components/QuestionFilter/JobSkillFilter';
import ErrorPage from '../components/ErrorHandling/ErrorPage';
import Pagination from '../components/Pagination/pagination';
import { BiSearch } from "react-icons/bi";
import "./AllQuestionPage.css";

/**
 * 전체 질문 목록을 표시하는 페이지 컴포넌트
 * 직무/기술 필터링, 정렬, 페이지네이션 기능 포함
 */
const AllQuestionPage = () => {
  // Redux dispatch 함수 초기화
  const dispatch = useAppDispatch();
  
  // Redux store에서 질문 관련 상태 가져오기
  const { questions, error, pagination } = useAppSelector(
    (state) => state.questions as QuestionState
  );

  // Redux store에서 직무/기술 관련 상태 가져오기
  const { jobs = [], skills = [] } = useAppSelector(
    (state) => state.jobs as JobState
  );

  /**
   * 필터링, 정렬, 페이지네이션을 위한 파라미터 상태
   * @property {number} page - 현재 페이지 번호 (0-based)
   * @property {number} size - 페이지당 항목 수
   * @property {SortField} sort - 정렬 기준 필드
   * @property {SortOrder} order - 정렬 방향
   * @property {JobType[]} jobs - 선택된 직무 필터 목록
   * @property {SkillType[]} skills - 선택된 기술 필터 목록
   */
  const [params, setParams] = useState<QuestionParams>({
    page: 0,
    size: 15,
    sort: 'acnt',
    order: 'desc',
    jobs: [],
    skills: []
  });

  /**
   * 컴포넌트 마운트 시 직무 목록 조회
   */
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  /**
   * params 변경 시 질문 목록 다시 조회
   * 필터, 정렬, 페이지 변경 시 실행됨
   */
  useEffect(() => {
    dispatch(fetchQuestions(params));
  }, [dispatch, params]);

  /**
   * 직무 필터 변경 핸들러
   * @param selectedJobs - 새로 선택된 직무 목록
   */
  const handleJobFilterChange = (selectedJobs: JobType[]) => {
    // 직무가 선택된 경우에만 해당 직무의 기술 목록 조회
    if (selectedJobs.length > 0) {
      dispatch(fetchSkillsByJobs(selectedJobs));
    }
    // 직무 변경 시 페이지 초기화 및 기술 필터 초기화
    setParams(prev => ({
      ...prev,
      page: 0,
      jobs: selectedJobs,
      skills: []
    }));
  };

  /**
   * 기술 필터 변경 핸들러
   * @param selectedSkills - 새로 선택된 기술 목록
   */
  const handleSkillFilterChange = (selectedSkills: SkillType[]) => {
    setParams(prev => ({
      ...prev,
      page: 0,
      skills: selectedSkills
    }));
  };

  /**
   * 정렬 변경 핸들러
   * @param sort - 정렬 기준 필드
   * @param order - 정렬 방향
   */
  const handleSort = (sort: SortField, order: SortOrder) => {
    setParams(prev => ({
      ...prev,
      sort,
      order
    }));
  };

  /**
   * 페이지 변경 핸들러
   * @param page - 새로운 페이지 번호
   */
  const handlePageChange = (page: number) => {
    setParams(prev => ({
      ...prev,
      page
    }));
  };

  /**
   * 필터 초기화 핸들러
   * 모든 필터링, 정렬 상태를 기본값으로 리셋
   */

  const handleReset = () => {
    const defaultParams : QuestionParams = {
      page: 0,
      size: 15,
      sort: 'acnt',
      order: 'desc',
      jobs: [],
      skills: []
    };
    
    // 상태 업데이트와 데이터 fetch를 동시에 실행
    Promise.all([
      dispatch(fetchQuestions(defaultParams)),
      setParams(defaultParams)
    ]);
  };
  
  // 에러 발생 시 에러 페이지 표시
  if (error) return <ErrorPage message='예상치 못한 에러가 발생했습니다. 잠시 후 다시 시도해주세요' />;

  return (
    <div className="question-page">
      {/* 페이지 헤더 */}
      <PageHeader 
        title="면접 질문 모음"
        description="원하는 직무와 기술별로 모든 면접 질문을 검색해보세요!"
        icon={<BiSearch />}
        iconStyle="search-icon"
      />

      {/* 직무/기술 필터 컴포넌트 */}
      <JobSkillFilter 
        jobFilter={params.jobs || []}
        skillFilter={params.skills || []}
        jobs={jobs}
        skills={skills}
        onJobFilterChange={handleJobFilterChange}
        onSkillFilterChange={handleSkillFilterChange}
        onReset={handleReset}
      />
      
      {/* 질문 목록 컴포넌트 */}
      <QuestionList 
        questions={questions}
        onSort={handleSort}
        currentSort={{
          field: params.sort || 'acnt',
          order: params.order || 'desc'
        }}
      />

      {/* 페이지네이션 컴포넌트 */}
      <Pagination 
        currentPage={pagination.number}
        totalPages={pagination.totalPages}
        first={pagination.first}
        last={pagination.last}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllQuestionPage;
