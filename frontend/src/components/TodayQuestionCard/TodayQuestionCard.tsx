// components/TodayQuestionCard/TodayQuestionCard.tsx

// 필요한 리액트 훅과 외부 라이브러리 임포트
import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import { RiBookmarkLine } from "react-icons/ri";
import { MdCalendarToday } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import TechIcon from "../TechIcon/TechIcon";
import "./TodayQuestionCard.css";

// 컴포넌트 props 타입 정의
interface QuestionCardProps {
  title: string;          // 질문 제목
  category: string;       // 기술 카테고리
  status?: string;
  onClick?: () => void;   // 클릭 이벤트 핸들러
}

// TodayQuestionCard 컴포넌트 정의
const TodayQuestionCard: React.FC<QuestionCardProps> = ({
  title,
  category,
  status,
  onClick,
}) => {
  // 현재 날짜 포맷팅
  const TODAY_DATE = format(new Date(), 'MMM dd, yyyy');
  // 카테고리 배경색 상태 관리
  const [bgColor, setBgColor] = useState<string>('rgba(102, 102, 102, 0.1)');

  // 카테고리에 따른 배경색 설정 효과
  useEffect(() => {
    // 카테고리 문자열 정규화
    const normalizedTech = category.trim().toLowerCase().replace(/[_-]/g, '.');
    
    // 임시 스타일 요소 생성
    const techIconStyle = document.createElement('style');
    techIconStyle.textContent = `.tech-icon.${normalizedTech} { }`;
    document.head.appendChild(techIconStyle);
    
    // 계산된 스타일 가져오기
    const computedStyle = window.getComputedStyle(document.querySelector(`.tech-icon.${normalizedTech}`) || document.createElement('div'));
    const color = computedStyle.getPropertyValue('color');
    
    // 임시 스타일 요소 제거
    document.head.removeChild(techIconStyle);

    // RGB 색상값을 추출하여 배경색 설정
    if (color) {
      const rgbMatch = color.match(/\d+/g);
      if (rgbMatch) {
        const [r, g, b] = rgbMatch;
        setBgColor(`rgba(${r}, ${g}, ${b}, 0.1)`);
      }
    }
  }, [category]);

  return (
    // 질문 카드 컨테이너
    <div className="question-card" onClick={onClick}>
      {/* 카드 헤더: 날짜와 북마크 아이콘 */}
      <div className="card-header">
        <div className="card-date">
          <MdCalendarToday size={20} color="#1976D2" />
          {TODAY_DATE}
        </div>
        <div className="bookmark-icon">
          <RiBookmarkLine size={20} />
        </div>
      </div>
      
    
      {/* 질문 제목 (풀이 상태에 따른 블러 처리) */}
      <h3 className={`card-title ${status !== "solved" ? 'blur-content' : ''}`}>
        {title}
      </h3>
      
      {/* 카드 푸터: 카테고리와 답변 링크 */}
      <div className="card-footer">
        {/* 기술 카테고리 표시 */}
        <div 
          className="card-category"
          style={{ 
            backgroundColor: bgColor,
            color: category ? getComputedStyle(document.querySelector(`.tech-icon.${category.toLowerCase()}`) || document.createElement('div')).color : '#1976D2'
          }}
        >
          <TechIcon tech={category} className="category-tech-icon" />
          {category.toLowerCase()}
        </div>
        {/* 답변 링크 (로그인 상태에 따라 다른 텍스트 표시) */}
        <div className="answer-link">
          {status === "solved" ? '다시 풀어보기' : '답변하러 가기'} <HiArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default TodayQuestionCard;
