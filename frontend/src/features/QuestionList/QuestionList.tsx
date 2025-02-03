// features/QuestionList.tsx
import React, { useState } from "react";
import TechIcon from "../../components/TechIcon/TechIcon";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import "./QuestionList.css";

interface QuestionListProps {
  questions: Question[]; // 질문 목록 props
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  // === 상태 관리 ===
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [sortKey, setSortKey] = useState<"challengeCount" | "answerCount" | null>(null); // 정렬 기준
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc"); // 정렬 방향
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]); // 선택된 질문 ID 목록

  const itemsPerPage = 15; // 페이지당 표시할 항목 수

  // 정렬된 질문 목록 생성
  const sortedQuestions = [...questions].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortDirection === "desc") {
      return b[sortKey] - a[sortKey];
    }
    return a[sortKey] - b[sortKey];
  });

  // 페이지네이션 처리
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const currentQuestions = sortedQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /**
   * 정렬 처리 핸들러
   * @param key 정렬할 기준 (도전 수 또는 답변 수)
   */
  const handleSort = (key: "challengeCount" | "answerCount") => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
    setCurrentPage(1); // 정렬 시 첫 페이지로 이동
  };

  /**
   * 정렬 아이콘 반환
   * @param key 정렬 기준
   * @returns 정렬 방향에 따른 아이콘
   */
  const getSortIcon = (key: "challengeCount" | "answerCount") => {
    if (sortKey !== key) return "▽";
    return sortDirection === "desc" ? "▼" : "▲";
  };

  /**
   * 전체 선택/해제 핸들러
   */
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedQuestions(currentQuestions.map((q) => q.id));
    } else {
      setSelectedQuestions([]);
    }
  };

  /**
   * 개별 질문 선택/해제 핸들러
   */
  const handleCheckbox = (questionId: number) => { 
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  /**
   * 북마크 추가 핸들러
   */
  const handleAddToBookmarks = () => {
    console.log("Selected questions to bookmark:", selectedQuestions);
  };

  /**
   * 페이지 번호 배열 생성
   */
  const getPageNumbers = () => {
    const pageNumbers = [];
    const currentGroup = Math.ceil(currentPage / 5); // 현재 페이지 그룹
    const lastGroup = Math.ceil(totalPages / 5); // 마지막 페이지 그룹
    const start = (currentGroup - 1) * 5 + 1; // 현재 그룹의 시작 페이지
    const end = Math.min(currentGroup * 5, totalPages); // 현재 그룹의 마지막 페이지

    // 첫 번째 그룹인 경우
    if (currentGroup === 1) {
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      if (totalPages > 5) {
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    // 마지막 그룹인 경우
    else if (currentGroup === lastGroup) {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }
    // 중간 그룹인 경우
    else {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="question-list">
      {/* 질문 목록 테이블 */}
      <table>
        <thead>
          <tr>
            {/* 전체 선택 체크박스 */}
            <th className="center">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  currentQuestions.length > 0 &&
                  selectedQuestions.length === currentQuestions.length
                }
              />
            </th>
            <th>질문</th>
            {/* 도전 수 정렬 헤더 */}
            <th
              className="center"
              onClick={() => handleSort("challengeCount")}
              style={{ cursor: "pointer" }}
            >
              도전 수 {getSortIcon("challengeCount")}
            </th>
            {/* 답변 수 정렬 헤더 */}
            <th
              className="center"
              onClick={() => handleSort("answerCount")}
              style={{ cursor: "pointer" }}
            >
              답변 수 {getSortIcon("answerCount")}
            </th>
          </tr>
        </thead>
        {/* 질문 목록 본문 */}
        <tbody>
          {currentQuestions.map((question) => (
            <tr key={question.id}>
              <td className="center">
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(question.id)}
                  onChange={() => handleCheckbox(question.id)}
                />
              </td>
              <td className="question-content">
                <div className="tech-icons">
                  {question.skills.map((tech) => (
                    <TechIcon key={tech} tech={tech} />
                  ))}
                </div>
                <span>{question.questionContent}</span>
              </td>
              <td className="center">{question.challengeCount}</td>
              <td className="center">{question.answerCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 북마크 추가 버튼 (선택된 항목이 있을 때만 표시) */}
      {selectedQuestions.length > 0 && (
        <div className="selected-actions">
          <button onClick={handleAddToBookmarks} className="bookmark-button">
            <PiBookmarkSimpleFill size={20} />
            북마크에 추가하기 ({selectedQuestions.length})
          </button>
        </div>
      )}

      {/* 페이지네이션 */}
      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="arrow-button"
        >
          &lt;
        </button>
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="ellipsis">...</span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(Number(page))}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          )
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="arrow-button"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default QuestionList;