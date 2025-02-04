import React from 'react';
import "../../../pages/QuestionDetailPage.css";

import { MdCalendarToday } from "react-icons/md";
import { RiBookmarkLine } from "react-icons/ri";
import QuestionSkillTag from './QuestionSkillTag';

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


  return (
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
        <RiBookmarkLine size={20} />
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
  </div>);
}

export default QuestionContentCard;