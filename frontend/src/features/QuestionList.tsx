// features/QuestionList.tsx
import React, { useState } from "react";
import TechIcon from "../components/TechIcon/TechIcon";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import "./QuestionList.css";

interface QuestionListProps {
  questions: Question[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<
    "challengeCount" | "answerCount" | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const itemsPerPage = 15;

  // 정렬 로직
  const sortedQuestions = [...questions].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortDirection === "desc") {
      return b[sortKey] - a[sortKey];
    }
    return a[sortKey] - b[sortKey];
  });

  // 페이지네이션 로직
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const currentQuestions = sortedQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: "challengeCount" | "answerCount") => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
    setCurrentPage(1);
  };

  const getSortIcon = (key: "challengeCount" | "answerCount") => {
    if (sortKey !== key) return "▽";
    return sortDirection === "desc" ? "▼" : "▲";
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedQuestions(currentQuestions.map((q) => q.id));
    } else {
      setSelectedQuestions([]);
    }
  };

  const handleCheckbox = (questionId: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleAddToBookmarks = () => {
    console.log("Selected questions to bookmark:", selectedQuestions);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="question-list">
      <table>
        <thead>
          <tr>
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
            <th
              className="center"
              onClick={() => handleSort("challengeCount")}
              style={{ cursor: "pointer" }}
            >
              도전 수 {getSortIcon("challengeCount")}
            </th>
            <th
              className="center"
              onClick={() => handleSort("answerCount")}
              style={{ cursor: "pointer" }}
            >
              답변 수 {getSortIcon("answerCount")}
            </th>
          </tr>
        </thead>
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
              <td className="question-title">
                <div className="tech-icons">
                  {question.skills.map((tech) => (
                    <TechIcon key={tech} tech={tech} />
                  ))}
                </div>
                {question.title}
              </td>
              <td className="center">{question.challengeCount}</td>
              <td className="center">{question.answerCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedQuestions.length > 0 && (
        <div className="selected-actions">
          <button onClick={handleAddToBookmarks} className="bookmark-button">
            <PiBookmarkSimpleFill size={20} />
            북마크에 추가하기 ({selectedQuestions.length})
          </button>
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default QuestionList;

