import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/useRedux";
import { fetchQuestions } from "../store/slices/questionSlice";
import PageHeader from "../components/PageHeader/PageHeader"
import QuestionList from "../features/QuestionList/QuestionList";
import JobSkillFilter from "../components/QuestionFilter/JobSkillFilter";
import StatusFilter from "../components/QuestionFilter/StatusFilter";
import SearchBar from "../components/SearchBar/SearchBar";
import dummyJobCategories from "../constants/dummyJobCategories";
import "./AllQuestionPage.css";
import { BiSearch } from "react-icons/bi";

const AllQuestionPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { questions, loading, error, pagination } = useAppSelector((state) => state.questions);
  
  // 필터 상태들
  const [statusFilter, setStatusFilter] = useState<"all" | "solved" | "unsolved">("all");
  const [jobFilter, setJobFilter] = useState<string[]>([]);
  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  
  // 페이지 로드시 데이터 fetch
  useEffect(() => {
    dispatch(fetchQuestions({ 
      page: currentPage, 
      size: 15 
    }));
  }, [dispatch, currentPage]);


  useEffect(() => {
    console.log(questions);
  }, [questions]); // questions가 실제로 변경될 때만 로그 출력

  /**
   * 필터링 로직
   */
  const filteredQuestions = questions.filter((question) => {
    // 직무 필터 적용
    if (jobFilter.length > 0 && 
        !question.jobList.some(job => jobFilter.includes(job))) {
      return false;
    }

    // 기술 필터 적용
    if (skillFilter.length > 0 && 
        !question.skillList.some(skill => skillFilter.includes(skill))) {
      return false;
    }

    // 검색어 필터 적용
    if (searchQuery && 
        !question.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // 상태 필터 적용
    if (statusFilter !== "all" && 
        question.status.toLowerCase() !== statusFilter) {
      return false;
    }

    return true;
  });

  /**
   * 필터 초기화 핸들러
   */
  const handleFilterReset = () => {
    setSkillFilter([]);
    setSearchQuery("");
    setStatusFilter("all");
    setCurrentPage(0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="question-page">
      <PageHeader 
        title="면접 질문 모음"
        description="원하는 직무와 기술별로 모든 면접 질문을 검색해보세요!"
        icon={<BiSearch />}
        iconStyle="search-icon"
      />

      <div className="filter-container">
        <JobSkillFilter
          jobFilter={jobFilter}
          skillFilter={skillFilter}
          jobCategories={dummyJobCategories}
          onJobFilterChange={(job) => {
            setJobFilter(job);
            handleFilterReset();
          }}
          onSkillFilterChange={setSkillFilter}
        />
        
        <div className="search-status-section">
          <StatusFilter
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
          <div className="search-wrapper">
            <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
          </div>
        </div>
      </div>

      <QuestionList 
        questions={filteredQuestions}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
};

export default AllQuestionPage;
