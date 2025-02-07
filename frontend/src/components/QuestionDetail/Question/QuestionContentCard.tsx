import React, { useState } from 'react';
import "../../../pages/QuestionDetailPage.css";

import { MdCalendarToday } from "react-icons/md";
import { RiBookmarkLine } from "react-icons/ri";
import QuestionSkillTag from './QuestionSkillTag';
import BookmarkModal from '../../Bookmark/BookmarkModal';

interface QuestionContentCardProps {
  question: Question;
  isToday: boolean;
}
const QuestionContentCard:React.FC<QuestionContentCardProps> = ({question, isToday}) => {
  const today = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',  // "Feb" 형식으로 짧은 월 이름 출력
    day: 'numeric',  // "1" 형식으로 일 출력
  }).format(new Date());

  // 북마크 모달 | useState를 import하고 showBookmarkModal 상태를 추가
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);


  // 북마크 아이콘 클릭 시 모달 오픈 함수
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBookmarkModal(true);
  };
  
  // <> </>을 통한 요소 그룹화
  return (
    <>
      <div className="question-detail_question-content">
        {/* today 질문의 경우에만 달력으로 날짜 표시 */}
        {isToday && <div className="question-content_today-date-div">
          <MdCalendarToday className="question-content_today-date-div_date-icon" />
          <div className="question-content_today-date-div_date  text-gray2">
            {today}
          </div>
        </div>}
        <div className="question-content_question-card-body">
          <div className="question-content_question-card-body_top">
            <span className="question-label">Q.</span>
            <RiBookmarkLine 
              size={20} 
              onClick={handleBookmarkClick}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="question-text">
            {question.content}
          </div>
          <div className="skill-tags-group">
            {question.skillList?.map(skill => (
              <QuestionSkillTag skill={skill} key={skill} />
            ))}
          </div>
        </div>
      </div>

      {showBookmarkModal && (
        <BookmarkModal 
          questionId={question.questionId} 
          onClose={() => setShowBookmarkModal(false)}
        />
      )}
    </>
  );
}

export default QuestionContentCard;