// pages/AllQuestionPage.tsx
import React, { useState } from "react";
import PageHeader from "../components/PageHeader/PageHeader"
import QuestionList from "../features/QuestionList";
import JobSkillFilter from "../components/QuestionFilter/JobSkillFilter";
import StatusFilter from "../components/QuestionFilter/StatusFilter";
import SearchBar from "../components/SearchBar/SearchBar";
import dummyQuestions from "../constants/dummyQuestions";
import dummyJobCategories from "../constants/dummyJobCategories";
import "./AllQuestionPage.css";
import { BiSearch } from "react-icons/bi";

/**
 * 모든 면접 질문을 보여주는 페이지 컴포넌트
 * 직무, 기술, 상태(푼/안푼), 검색어로 질문을 필터링할 수 있음
 */
const AllQuestionPage: React.FC = () => {
  // === 상태 관리 ===
  // 기본 데이터 상태
  const [questions, setQuestions] = useState<Question[]>(dummyQuestions); // 전체 질문 목록
  const [jobCategories, setJobCategories] = useState<JobCategory[]>(dummyJobCategories); // 직무 카테고리 목록

  // 필터 상태들
  const [statusFilter, setStatusFilter] = useState<"all" | "solved" | "unsolved">("all"); // 문제 풀이 상태 필터
  const [jobFilter, setJobFilter] = useState<string[]>([]); // 선택된 직무 필터
  const [skillFilter, setSkillFilter] = useState<string[]>([]); // 선택된 기술 필터
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어

  /**
   * 필터링 로직
   * 모든 필터 조건을 적용하여 질문 목록을 필터링
   */
  const filteredQuestions = questions.filter((question) => {
    // 직무 필터 적용
    if (
      jobFilter.length > 0 &&
      !question.jobCategory.some((job) => jobFilter.includes(job))
    ) {
      return false;
    }

    // 기술 필터 적용
    if (
      skillFilter.length > 0 &&
      !question.skills.some((skill) => skillFilter.includes(skill))
    ) {
      return false;
    }

    // 검색어 필터 적용
    if (
      searchQuery &&
      !question.questionContent.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // 문제 풀이 상태 필터 적용
    if (
      statusFilter !== "all" &&
      question.status.toLowerCase() !== statusFilter
    ) {
      return false;
    }

    return true;
  });

  /**
   * 필터 초기화 핸들러
   * 직무 필터 변경 시 다른 필터들을 초기화
   */
  const handleFilterReset = () => {
    setSkillFilter([]);
    setSearchQuery("");
    setStatusFilter("all");
  };

  return (
    <div className="question-page">
      {/* 페이지 헤더 */}
      <PageHeader 
        title="면접 질문 모음"
        description="원하는 직무와 기술별로 모든 면접 질문을 검색해보세요!"
        icon={<BiSearch />}
        iconStyle="search-icon"
      />

      {/* 필터 섹션 */}
      <div className="filter-container">
        {/* 직무/기술 필터 */}
        <JobSkillFilter
          jobFilter={jobFilter}
          skillFilter={skillFilter}
          jobCategories={jobCategories}
          onJobFilterChange={(job) => {
            setJobFilter(job);
            handleFilterReset();
          }}
          onSkillFilterChange={setSkillFilter}
        />
        
        {/* 상태 필터와 검색바 */}
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

      {/* 필터링된 질문 목록 */}
      <QuestionList questions={filteredQuestions} />
    </div>
  );
};

export default AllQuestionPage;