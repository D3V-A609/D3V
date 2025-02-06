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
        "DevOps",
        "Data Engineer",
        "Data Scientist",
        "Machine Learning Engineer",
        "Android",
        "iOS",
        "Game Developer",
    ];
  const handleJobClick = (jobName: string) => {
    const newJobFilter = jobFilter.includes(jobName)
      ? jobFilter.filter((job) => job !== jobName)
      : [jobName]; // 한 번에 하나의 직무만 선택 가능
    
    onJobFilterChange(newJobFilter);
  };

  const handleReset = () => {
    onJobFilterChange([]);
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
      
      {jobFilter.length > 0 && (
        <div className="filter-footer">
          <button className="reset-button" onClick={handleReset}>
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default Top10Filter;
