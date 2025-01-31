// components/TodayQuestionCard/TodayQuestionCard.tsx
import React from "react";
import { format } from 'date-fns';
import { RiBookmarkLine } from "react-icons/ri";
import { MdCalendarToday } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import "./TodayQuestionCard.css";

interface QuestionCardProps {
  title: string;
  category: string;
  isLoggedIn?: boolean;
  onClick?: () => void;
}

const TodayQuestionCard: React.FC<QuestionCardProps> = ({
  title,
  category,
  // 로그인 기능이 생기면 false 삭제하면 됨
  isLoggedIn = false, 
  onClick,
}) => {
  const TODAY_DATE = format(new Date(), 'MMM dd, yyyy');

  return (
    <div className="question-card" onClick={onClick}>
      <div className="card-header">
        <div className="card-date">
          <MdCalendarToday size={20} color="#1976D2" />
          {TODAY_DATE}
        </div>
        <div className="bookmark-icon">
          <RiBookmarkLine size={20} />
        </div>
      </div>
      <h3 className={`card-title ${!isLoggedIn ? 'blur-content' : ''}`}>
        {title}
      </h3>
      <div className="card-footer">
        <div className="card-category">
          <span className="category-icon">⚛️</span>
          {category}
        </div>
        <div className="answer-link">
          {isLoggedIn ? '답변하러 가기' : '로그인하고 답변하기'} <HiArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default TodayQuestionCard;