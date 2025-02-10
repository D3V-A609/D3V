// pages/AllQuestionPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../store/actions/questionActions';

const AllQuestionPage = () => {
  const dispatch = useDispatch();
  
  // Redux store에서 필요한 상태 가져오기
  const { 
    questions, 
    loading, 
    error,
    pagination 
  } = useSelector((state: { questions: QuestionState }) => state.questions);

  // 컴포넌트 마운트 시 질문 목록 조회
  useEffect(() => {
    dispatch(fetchQuestions({
      page: 0,
      size: 15,
      order: 'desc',
      sort: 'acnt'
    }));
  }, [dispatch]);
  console.log(questions)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Questions</h1>
      <div className="question-list">
        {questions.map((question) => (
          <div key={question.id} className="question-item">
            <h3>{question.content}</h3>
            <div>
              <span>Answers: {question.answerCount}</span>
              <span>Status: {question.status}</span>
            </div>
            <div>
              <span>Skills: {question.skillList.join(', ')}</span>
              <span>Jobs: {question.jobList.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <span>Total: {pagination.totalElements}</span>
        <span>Page: {pagination.currentPage + 1} of {pagination.totalPages}</span>
      </div>
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
