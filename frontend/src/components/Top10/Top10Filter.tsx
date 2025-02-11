import React from "react";
import "./Top10Filter.css";

interface Top10FilterProps {
  jobFilter: string[];
  onJobFilterChange: (jobs: string[]) => void;
}

const Top10Filter: React.FC<Top10FilterProps> = ({
  jobFilter,
  onJobFilterChange,
}) => {
    const JOB_CATEGORIES = [
      "Front-end",
      "Back-end",
      "Full-stack",
      "Mobile",
      "Block Chain",
      "Embedded",
      "DevOps",
      "Database",
      "Testing",
      "Data Science",
      "Machine Learning",
      "Game Development",
      "Cyber Security",
    ];
  const handleJobClick = (jobName: string) => {
    const newJobFilter = jobFilter.includes(jobName)
      ? jobFilter.filter((job) => job !== jobName)
      : [jobName]; // 한 번에 하나의 직무만 선택 가능
    
    onJobFilterChange(newJobFilter);
  };

  return (
    <div className="filter-container">
      <div className="filter-section">
        <div className="filter-buttons">
          {JOB_CATEGORIES.map((job) => (
            <button
              key={job}
              className={`filter-button ${jobFilter.includes(job) ? "active" : ""}`}
              onClick={() => handleJobClick(job)}
            >
              {job}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top10Filter;
