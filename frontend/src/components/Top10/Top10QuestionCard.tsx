import React, { useEffect, useState } from "react";
import TechIcon from "../TechIcon/TechIcon";
import { RiBookmarkLine } from "react-icons/ri";
import { HiArrowRight } from "react-icons/hi";
import "./Top10QuestionCard.css";

interface Top10QuestionCardProps {
  title: string;
  category: string;
  onClick?: () => void;
}

const Top10QuestionCard: React.FC<Top10QuestionCardProps> = ({
  title,
  category,
  onClick,
}) => {
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
    <div className="top10-question-card" onClick={onClick}>
      {/* <div className="bookmark-icon">
        <RiBookmarkLine size={20} />
      </div> */}
      <h3 className="card-title">{title}</h3>
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
        <div className="answer-link">
          답변하러 가기 <HiArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default Top10QuestionCard;
