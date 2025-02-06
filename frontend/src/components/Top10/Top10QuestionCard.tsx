import React from "react";
import TechIcon from "../TechIcon/TechIcon";
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
  return (
    <div className="top10-question-card" onClick={onClick}>
      <h3 className="card-title">{title}</h3>
      <div className="card-footer">
        <div className="card-category">
          <TechIcon tech={category} className="category-tech-icon" />
          {category.toLowerCase()}
        </div>
      </div>
    </div>
  );
};

export default Top10QuestionCard;
