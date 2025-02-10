// pages/AllQuestionPage.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { fetchQuestions } from '../store/actions/questionActions';
import { QuestionState } from '../store/slices/questionSlice';
import PageHeader from "../components/PageHeader/PageHeader"
import StatusFilter from '../components/QuestionFilter/StatusFilter';
import QuestionList from '../features/QuestionList/QuestionList';
import Pagination from '../components/Pagination/Pagination';

import { BiSearch } from "react-icons/bi";
import "./AllQuestionPage.css";

const AllQuestionPage = () => {
  // Redux dispatch 함수 가져오기
  const dispatch = useAppDispatch();
  
  // Redux store에서 필요한 상태들을 가져옴
  const { questions, error, pagination } = useAppSelector(
    (state) => state.questions as QuestionState
  );

  // 정렬 상태를 관리하는 state
  // field: 정렬 기준 필드 (acnt: 답변수, ccnt: 도전수)
  // order: 정렬 방향 (desc: 내림차순, asc: 오름차순)
  const [currentSort, setCurrentSort] = useState<{
    field: SortField;
    order: SortOrder;
  }>({
    field: 'acnt',  // 초기값: 답변수 기준
    order: 'desc'   // 초기값: 내림차순
  });
  
  // 필터 상태
  const [statusFilter, setStatusFilter] = useState<QuestionStatus | 'all'>('all');

  // 컴포넌트 마운트 시 또는 정렬 상태 변경 시 질문 목록 조회
  useEffect(() => {
    dispatch(fetchQuestions({
      page: 0,
      size: 15,
      order: currentSort.order,
      sort: currentSort.field,
      solved: statusFilter === 'all' ? undefined : statusFilter
    }));
  }, [dispatch, currentSort, statusFilter]);

  
  console.log(pagination)

  // 필터 변경 시 페이지를 0으로 리셋
  const handleStatusFilterChange = (status: QuestionStatus | 'all') => {
    setStatusFilter(status);
    dispatch(fetchQuestions({
      page: 0,
      size: pagination.size,
      sort: currentSort.field,
      order: currentSort.order,
      solved: status === 'all' ? undefined : status
    }));
  };

  // 정렬 변경 시에도 현재 필터 상태를 유지
  const handleSort = (sort: SortField, order: SortOrder) => {
    setCurrentSort({ field: sort, order });
    dispatch(fetchQuestions({
      page: pagination.currentPage,
      size: pagination.size,
      sort,
      order,
      solved: statusFilter === 'all' ? undefined : statusFilter
    }));
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    dispatch(fetchQuestions({
      page,
      size: pagination.size,
      sort: currentSort.field,
      order: currentSort.order,
      solved: statusFilter === 'all' ? undefined : statusFilter
    }));
  };

  // 로딩 중이면 로딩 표시
  // if (loading) return <div>Loading...</div>;
  // 에러가 있으면 에러 메시지 표시
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="question-page">
      <PageHeader 
        title="면접 질문 모음"
        description="원하는 직무와 기술별로 모든 면접 질문을 검색해보세요!"
        icon={<BiSearch />}
        iconStyle="search-icon"
      />

      <StatusFilter 
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
      />

      <QuestionList 
        questions={questions}
        onSort={handleSort}
        currentSort={currentSort}
      />

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllQuestionPage;






// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../store/hooks/useRedux";
// import PageHeader from "../components/PageHeader/PageHeader"
// import QuestionList from "../features/QuestionList/QuestionList";
// import JobSkillFilter from "../components/QuestionFilter/JobSkillFilter";
// import StatusFilter from "../components/QuestionFilter/StatusFilter";
// import SearchBar from "../components/SearchBar/SearchBar";
// import dummyJobCategories from "../constants/dummyJobCategories";
// import "./AllQuestionPage.css";
// import { BiSearch } from "react-icons/bi";
// import { fetchQuestions } from "../store/actions/questionActions";
// import { QuestionState } from "../store/slices/questionSlice";

// const AllQuestionPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { questions, loading, error, pagination } = useAppSelector((state) => state.questions as QuestionState);
  
//   // 필터 상태들
//   const [statusFilter, setStatusFilter] = useState<"all" | "solved" | "unsolved">("all");
//   const [jobFilter, setJobFilter] = useState<string[]>([]);
//   const [skillFilter, setSkillFilter] = useState<string[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState<number>(0);
  
//   // 페이지 로드시 데이터 fetch
//   useEffect(() => {
//     dispatch(fetchQuestions({ 
//       page: currentPage, 
//       size: 15 
//     }));
//   }, [dispatch, currentPage]);


//   useEffect(() => {
//     console.log(questions);
//   }, [questions]); // questions가 실제로 변경될 때만 로그 출력

//   /**
//    * 필터링 로직
//    */
//   const filteredQuestions = questions.filter((question) => {
//     // 직무 필터 적용
//     if (jobFilter.length > 0 && 
//         !question.jobList.some(job => jobFilter.includes(job))) {
//       return false;
//     }

//     // 기술 필터 적용
//     if (skillFilter.length > 0 && 
//         !question.skillList.some(skill => skillFilter.includes(skill))) {
//       return false;
//     }

//     // 검색어 필터 적용
//     if (searchQuery && 
//         !question.content.toLowerCase().includes(searchQuery.toLowerCase())) {
//       return false;
//     }

//     // 상태 필터 적용
//     if (statusFilter !== "all" && 
//       (question.status?.toLowerCase() || "unsolved") !== statusFilter) {
//       return false;
//     }

//     return true;
//   });

//   /**
//    * 필터 초기화 핸들러
//    */
//   const handleFilterReset = () => {
//     setSkillFilter([]);
//     setSearchQuery("");
//     setStatusFilter("all");
//     setCurrentPage(0);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="question-page">
//       <PageHeader 
//         title="면접 질문 모음"
//         description="원하는 직무와 기술별로 모든 면접 질문을 검색해보세요!"
//         icon={<BiSearch />}
//         iconStyle="search-icon"
//       />

//       <div className="filter-container">
//         <JobSkillFilter
//           jobFilter={jobFilter}
//           skillFilter={skillFilter}
//           jobCategories={dummyJobCategories}
//           onJobFilterChange={(job) => {
//             setJobFilter(job);
//             handleFilterReset();
//           }}
//           onSkillFilterChange={setSkillFilter}
//         />
        
//         <div className="search-status-section">
//           <StatusFilter
//             statusFilter={statusFilter}
//             onStatusFilterChange={setStatusFilter}
//           />
//           <div className="search-wrapper">
//             <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
//           </div>
//         </div>
//       </div>

//       <QuestionList 
//         questions={filteredQuestions}
//         currentPage={currentPage}
//         onPageChange={setCurrentPage}
//         totalPages={pagination.totalPages}
//       />
//     </div>
//   );
// };

// export default AllQuestionPage;
