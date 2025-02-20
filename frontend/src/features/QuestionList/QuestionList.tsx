import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch} from "../../store/hooks/useRedux";
import TechIcon from "../../components/TechIcon/TechIcon";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import "./QuestionList.css";
import BookmarkModal from "../../components/Bookmark/BookmarkModal";
import { moveToQuestionDetail } from "../../utils/navigation";

// QuestionList 컴포넌트의 props 타입 정의
interface QuestionListProps {
  questions: Question[];                    // 질문 목록
  onSort: (sort: SortField, order: SortOrder) => void;  // 정렬 변경 핸들러
  currentSort: {                            // 현재 정렬 상태
    field: SortField;                       // 정렬 기준 필드
    order: SortOrder;                       // 정렬 방향
  };
}

const QuestionList: React.FC<QuestionListProps> = ({ 
  questions,
  onSort,
  currentSort  
}) => {
  // 페이지 이동을 위한 navigate 훅
  const navigate = useNavigate();
  // Redux dispatch 함수
  const dispatch = useAppDispatch();

  // 선택된 질문들의 ID를 관리하는 state
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const [isBookmarkModalOpen, setBookmarkModalOpen] = useState(false);

  // 정렬 핸들러: 같은 필드를 다시 클릭하면 정렬 방향을 토글
  const handleSort = (field: SortField) => {
    const newOrder = currentSort.field === field && currentSort.order === 'desc' ? 'asc' : 'desc';
    onSort(field, newOrder);
  };

  // 전체 선택 체크박스 핸들러
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedQuestions(questions.map((q) => q.id));
    } else {
      setSelectedQuestions([]);
    }
  };

  // 개별 체크박스 핸들러
  const handleCheckbox = (id: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(id)
        ? prev.filter((id) => id !== id)
        : [...prev, id]
    );
  };

  const handleAddToBookmarks = () => {
    setBookmarkModalOpen(true);
  };

  const handleBookmarkModalClose = () => {
    setBookmarkModalOpen(false);
    setSelectedQuestions([]);
  };

  return (
    <div className="question-list">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {/* 전체 선택 체크박스 */}
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
              {/* 답변 수 정렬 헤더 */}
              <th
                className="center"
                onClick={() => handleSort('acnt')}
                style={{ cursor: "pointer" }}
              >
                답변 수 {currentSort.field === 'acnt' ? (currentSort.order === 'desc' ? '▼' : '▲') : '▽'}
              </th>
              {/* 도전 수 정렬 헤더 */}
              <th
                className="center"
                onClick={() => handleSort('ccnt')}
                style={{ cursor: "pointer" }}
              >
                도전 수 {currentSort.field === 'ccnt' ? (currentSort.order === 'desc' ? '▼' : '▲') : '▽'}
              </th>
              {/* 평균 제출 수 정렬 헤더 */}
              <th
                className="center"
                onClick={() => handleSort('avg')}
                style={{ cursor: "pointer" }}
              >
                제출 수 평균 {currentSort.field === 'avg' ? (currentSort.order === 'desc' ? '▼' : '▲') : '▽'}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 질문 목록 렌더링 */}
            {questions.map((question) => (
              <tr key={question.id}>
                <td className="center">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => handleCheckbox(question.id)}
                  />
                </td>
                <td 
                  className="question-content"
                  onClick={() => moveToQuestionDetail(navigate, dispatch, question.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* 기술 스택 아이콘 */}
                  <div className="tech-icons">
                    {question.skillList.map((tech) => (
                      <TechIcon key={tech} tech={tech} />
                    ))}
                  </div>
                  <span>{question.content}</span>
                </td>
                <td className="center">{question.answerCount}</td>
                <td className="center">{question.challengeCount}</td>
                <td className="center">{question.answerAverage}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 북마크 추가 버튼 (질문이 선택된 경우에만 표시) */}
        {selectedQuestions.length > 0 && (
          <div className="selected-actions">
            <button onClick={handleAddToBookmarks} className="bookmark-button">
              <PiBookmarkSimpleFill size={20} />
              북마크에 추가하기 ({selectedQuestions.length})
            </button>
          </div>
        )}

{isBookmarkModalOpen && (
          <BookmarkModal
            questionIds={selectedQuestions}
            onClose={handleBookmarkModalClose}
          />
        )}
      </div>  
    </div>
  );
};

export default QuestionList;
