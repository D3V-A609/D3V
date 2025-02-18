import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { fetchQuestions } from '../store/actions/questionActions';
import { fetchJobs, fetchSkillsByJobs } from '../store/actions/jobActions';
import { QuestionState } from '../store/slices/questionSlice';
import PageHeader from "../components/PageHeader/PageHeader"
import StatusFilter from '../components/QuestionFilter/StatusFilter';
import QuestionList from '../features/QuestionList/QuestionList';
import JobSkillFilter from '../components/QuestionFilter/JobSkillFilter';
import ErrorPage from '../components/ErrorHandling/ErrorPage';
import Pagination from '../components/Pagination/Pagination';
import SearchBar from '../components/SearchBar/SearchBar';
import "./AllQuestionPage.css";
import { ImFolderOpen } from 'react-icons/im';

/**
 * 전체 질문 목록을 표시하는 페이지 컴포넌트
 * 직무/기술/상태 필터링, 정렬, 페이지네이션 기능 포함
 */
const AllQuestionPage:React.FC = () => {
  const location = useLocation();
  const state = location.state as {solved?: string};
  const initialJobFilter = location.state?.initialJobFilter || [];
  // Redux 상태 관리
  const dispatch = useAppDispatch();
  const { questions, error, pagination } = useAppSelector((state) => state.questions as QuestionState);
  const { jobs = [], skills = [] } = useAppSelector((state) => state.jobs as JobState);

  /**
   * 필터링, 정렬, 페이지네이션을 위한 파라미터 상태
   * @property {number} page - 현재 페이지 번호 (0-based)
   * @property {number} size - 페이지당 항목 수
   * @property {SortField} sort - 정렬 기준 필드 (답변수, 도전수, 평균점수)
   * @property {SortOrder} order - 정렬 방향 (오름차순/내림차순)
   * @property {string[]} jobs - 선택된 직무 필터 목록
   * @property {string[]} skills - 선택된 기술 필터 목록
   * @property {QuestionStatus} solved - 문제 해결 상태 필터
   */
  const [params, setParams] = useState<QuestionParams>({
    page: 0,
    size: 15,
    sort: 'acnt',
    order: 'desc',
    jobs: initialJobFilter,
    skills: [],
    solved: state?.solved as QuestionStatus || undefined,
    keyword: undefined
  });

  // 컴포넌트 마운트 시 직무 목록 조회
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // initialJobFilter가 변경될 때 params 업데이트 및 관련 스킬 조회
  useEffect(() => {
    if (initialJobFilter.length > 0) {
      setParams(prev => ({
        ...prev,
        jobs: initialJobFilter,
      }));
      dispatch(fetchSkillsByJobs(initialJobFilter));
    }
  }, [initialJobFilter, dispatch]);

  // params 변경 시 질문 목록 다시 조회
  useEffect(() => {
    dispatch(fetchQuestions(params));
  }, [dispatch, params]);

  // 마이페이지로부터 이동 되었을 때 solved 상태 확인 후 필터링 해준다
  useEffect(() => {
    if (location.state?.solved) {
      handleStatusFilterChange(location.state.solved); // ✅ 이동 시 받은 solved 값 적용
    }
  }, [location.state?.solved]);
  

  /**
   * 필터 핸들러 함수들
   */
  const handleJobFilterChange = (selectedJobs: JobType[]) => {
    if (selectedJobs.length > 0) {
      dispatch(fetchSkillsByJobs(selectedJobs));
    }
    setParams(prev => ({
      ...prev,
      page: 0,
      jobs: selectedJobs,
      skills: [],
      solved: undefined,
      keyword: undefined  
    }));
  };

  const handleSkillFilterChange = (selectedSkills: SkillType[]) => {
    setParams(prev => ({
      ...prev,
      page: 0,
      skills: selectedSkills,
      solved: undefined,
      keyword: undefined
    }));
  };

  const handleStatusFilterChange = (status: QuestionStatus | "all") => {
    setParams(prev => ({
      ...prev,
      page: 0,
      solved: status === "all" ? undefined : status
    }));
  };

  /**
   * 정렬 및 페이지네이션 핸들러
   */
  const handleSort = (sort: SortField, order: SortOrder) => {
    setParams(prev => ({ ...prev, sort, order }));
  };

  const handlePageChange = (page: number) => {
    setParams(prev => ({ ...prev, page }));
  };

   /**
   * 검색어 변경 핸들러
   * @param query - 새로운 검색어
   */
  const handleSearch = (query: string) => {
    setParams(prev => ({
      ...prev,
      page: 0,  // 검색 시 첫 페이지로 이동
      keyword: query || undefined  // 빈 문자열인 경우 undefined로 설정
    }));
  };
  
  /**
   * 모든 필터 초기화
   */
  const handleReset = () => {
    const defaultParams: QuestionParams = {
      page: 0,
      size: 15,
      sort: 'acnt',
      order: 'desc',
      jobs: [],
      skills: [],
      solved: undefined,
      keyword: undefined
    };
    
    Promise.all([
      dispatch(fetchQuestions(defaultParams)),
      setParams(defaultParams)
    ]);
  };
  
  if (error) return <ErrorPage message='예상치 못한 에러가 발생했습니다. 잠시 후 다시 시도해주세요' />;

  return (
    <div className="question-page">
      {/* 페이지 상단 헤더 영역
          - 페이지 제목과 설명
          - 검색 아이콘 포함 */}
      <PageHeader 
        title="면접 질문 모음"
        description="원하는 직무와 기술별로 모든 면접 질문을 검색해보세요!"
        icon={<ImFolderOpen />}
        iconStyle="search-icon"
      />

      {/* 직무/기술 필터링 영역
          - 직무 선택 시 해당 직무의 기술 목록 자동 조회
          - 필터 초기화 기능 포함 */}
      <JobSkillFilter 
        jobFilter={params.jobs || []}
        skillFilter={params.skills || []}
        jobs={jobs}
        skills={skills}
        onJobFilterChange={handleJobFilterChange}
        onSkillFilterChange={handleSkillFilterChange}
        onReset={handleReset}
      />
      
      {/* 검색바와 상태 필터 */}
      <div className="search-status-section">
        {/* 문제 상태 필터링 영역
          - 전체/푼 문제/진행 중/안 푼 문제 필터링
          - 상태별 질문 목록 조회 */}
        <StatusFilter 
          statusFilter={params.solved || "all"}
          onStatusFilterChange={handleStatusFilterChange}
        />
        <div className="search-wrapper">
          {/* 검색바 */}
          <SearchBar 
            onSearch={handleSearch}
            searchQuery={params.keyword || ""}
          />
        </div>
      </div>
      
      {/* 질문 목록 표시 영역
          - 답변 수/도전 수/평균 점수 기준 정렬 기능
          - 각 질문 클릭 시 상세 페이지로 이동 */}
      <QuestionList 
        questions={questions}
        onSort={handleSort}
        currentSort={{
          field: params.sort || 'acnt',
          order: params.order || 'desc'
        }}
      />

      {/* 페이지네이션 영역
          - 페이지 이동 기능
          - 첫 페이지/마지막 페이지 표시 */}

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
