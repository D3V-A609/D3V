import React from "react";
import "./QuestionSkillTag.css";

import getSkillStyle from "./skillTagStyle";
import TechIcon from "../../TechIcon/TechIcon";

interface QuestionSkillProps {
  skill: string;
}

const QuestionSkillTag: React.FC<QuestionSkillProps> = ({ skill }) => {
  const skillStyle = getSkillStyle(skill.toLowerCase());

  // Hex 코드를 rgba로 변환하는 함수
  const hexToRgba = (hex: string, opacity: number) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div
      className="skill-tag-container"
      style={{ backgroundColor: hexToRgba(skillStyle.backgroundColor, 0.1) }} // 투명도 10%
    >
      <TechIcon tech={skill.toLowerCase()} className="skill-tag-icon" />
      {skillStyle.skillName}
    </div>
  );
};

export default QuestionSkillTag;
