import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { setSelectedQuestionId } from "../../store/slices/questionSlice";
import TechIcon from "../../components/TechIcon/TechIcon";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import "./QuestionList.css";

interface QuestionListProps {
  questions: Question[];
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const QuestionList: React.FC<QuestionListProps> = ({ 
  questions, 
  currentPage, 
  onPageChange, 
  totalPages 
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [sortKey, setSortKey] = useState<"challengeCount" | "answerCount" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  // 정렬된 질문 목록 생성
  const sortedQuestions = [...questions].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortDirection === "desc") {
      return b[sortKey] - a[sortKey];
    }
    return a[sortKey] - b[sortKey];
  });

  const handleSort = (key: "challengeCount" | "answerCount") => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
    onPageChange(0); // API는 0부터 시작하므로 0으로 변경
  };

  const getSortIcon = (key: "challengeCount" | "answerCount") => {
    if (sortKey !== key) return "▽";
    return sortDirection === "desc" ? "▼" : "▲";
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedQuestions(questions.map((q) => q.questionId));
    } else {
      setSelectedQuestions([]);
    }
  };

  const handleCheckbox = (questionId: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleAddToBookmarks = () => {
    console.log("Selected questions to bookmark:", selectedQuestions);
  };

  const handleQuestionClick = (questionId: number) => {
    dispatch(setSelectedQuestionId(questionId));
    navigate(`/question`);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const currentGroup = Math.ceil((currentPage + 1) / 5);
    const lastGroup = Math.ceil(totalPages / 5);
    const start = (currentGroup - 1) * 5;
    const end = Math.min(currentGroup * 5 - 1, totalPages - 1);

    if (currentGroup === 1) {
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      if (totalPages > 5) {
        pageNumbers.push('...');
        pageNumbers.push(totalPages - 1);
      }
    } else if (currentGroup === lastGroup) {
      pageNumbers.push(0);
      pageNumbers.push('...');
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(0);
      pageNumbers.push('...');
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages - 1);
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
                  questions.length > 0 &&
                  selectedQuestions.length === questions.length
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
          {sortedQuestions.map((question) => (
            <tr key={question.questionId}>
              <td className="center">
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(question.questionId)}
                  onChange={() => handleCheckbox(question.questionId)}
                />
              </td>
              <td 
                className="question-content"
                onClick={() => handleQuestionClick(question.questionId)}
                style={{ cursor: 'pointer' }}
              >
                <div className="tech-icons">
                  {question.skillList.map((tech) => (
                    <TechIcon key={tech} tech={tech} />
                  ))}
                </div>
                <span>{question.content}</span>
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
          onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
          disabled={currentPage === 0}
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
              onClick={() => onPageChange(Number(page))}
              className={currentPage === page ? "active" : ""}
            >
              {Number(page) + 1}
            </button>
          )
        ))}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          className="arrow-button"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default QuestionList;
