// pages/AllQuestionPage.tsx
import React, { useState } from "react";
import QuestionList from "../features/QuestionList";
import JobSkillFilter from "../components/QuestionFilter/JobSkillFilter";
import StatusFilter from "../components/QuestionFilter/StatusFilter";
import SearchBar from "../components/SearchBar/SearchBar";
import dummyQuestions from "../constants/dummyQuestions";
import dummyJobCategories from "../constants/dummyJobCategories";
import "./AllQuestionPage.css";
import { BiSearch } from "react-icons/bi";

const AllQuestionPage: React.FC = () => {
  // 기본 데이터 상태
  const [questions, setQuestions] = useState<Question[]>(dummyQuestions);
  const [jobCategories, setJobCategories] =
    useState<JobCategory[]>(dummyJobCategories);

  // 필터 상태들
  const [statusFilter, setStatusFilter] = useState<
    "all" | "solved" | "unsolved"
  >("all");
  const [jobFilter, setJobFilter] = useState<string[]>([]);
  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 필터링 로직
  const filteredQuestions = questions.filter((question) => {
    if (
      jobFilter.length > 0 &&
      !question.jobCategory.some((job) => jobFilter.includes(job))
    ) {
      return false;
    }

    if (
      skillFilter.length > 0 &&
      !question.skills.some((skill) => skillFilter.includes(skill))
    ) {
      return false;
    }

    if (
      searchQuery &&
      !question.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (
      statusFilter !== "all" &&
      question.status.toLowerCase() !== statusFilter
    ) {
      return false;
    }

    return true;
  });

  // 필터 초기화 핸들러
  const handleFilterReset = () => {
    setSkillFilter([]);
    setSearchQuery("");
    setStatusFilter("all");
  };

  return (
    <div className="question-page">
      <div className="question-header">
        <p className="page-description">
          <BiSearch className="question-header-icon" />
          원하는 직무와 기술별로 모든 면접 질문을 검색해보세요!
        </p>
        <h1 className="page-title">면접 질문 모음</h1>
      </div>

      <div className="filter-container">
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

      <QuestionList questions={filteredQuestions} />
    </div>
  );
};

export default AllQuestionPage;

// // pages/AllQuestionPage.tsx
// import React, { useState } from "react";
// import QuestionList from "../features/QuestionList";
// import dummyQuestions from "../constants/dummyQuestions";
// import dummyJobCategories from "../constants/dummyJobCategories";
// import "./AllQuestionPage.css";
// import TodayQuestion from "../features/TodayQuestion";

// const AllQuestionPage: React.FC = () => {
//   // dummy 데이터로 초기 상태 설정
//   const [questions, setQuestions] = useState<Question[]>(dummyQuestions);
//   const [jobCategories, setJobCategories] =
//     useState<JobCategory[]>(dummyJobCategories);

//   /*
//   // 추후 API 연동 시 사용할 상태들
//   // const [isLoading, setIsLoading] = useState(true);
//   // const [error, setError] = useState<string | null>(null);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       setIsLoading(true);
//   //       const [questionsResponse, categoriesResponse] = await Promise.all([
//   //         fetch("/api/questions"),
//   //         fetch("/api/job-categories")
//   //       ]);
//   //
//   //       const [questionsData, categoriesData] = await Promise.all([
//   //         questionsResponse.json(),
//   //         categoriesResponse.json()
//   //       ]);
//   //
//   //       setQuestions(questionsData);
//   //       setJobCategories(categoriesData);
//   //     } catch (err) {
//   //       setError("데이터를 불러오는데 실패했습니다.");
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };
//   //
//   //   fetchData();
//   // }, []);
//   */

//   return (
//     <div className="question-page">
//       <TodayQuestion />
//       <h1 className="page-title">CS 질문 모음</h1>
//       <QuestionList questions={questions} jobCategories={jobCategories} />
//     </div>
//   );
// };

// export default AllQuestionPage;
