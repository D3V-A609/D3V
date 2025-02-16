import React from "react";
import "./Top10Filter.css";

type JobType = string;

interface Top10FilterProps {
  selectedJob: string;
  onJobChange: (job: string) => void;
  jobCategories: { [key: string]: string };
}

const Top10Filter: React.FC<Top10FilterProps> = ({
  selectedJob,
  onJobChange,
  jobCategories,
}) => {
  const handleJobClick = (jobName: JobType) => {
    onJobChange(jobName);
  };

  return (
    <div className="top10-filter-container">
      <div className="filter-section">
        <div className="filter-buttons">
          {Object.entries(jobCategories).map(([jobKey, jobName]) => (
            <button
              key={jobKey}
              className={`filter-button ${selectedJob === jobKey ? "active" : ""}`}
              onClick={() => handleJobClick(jobKey)}
            >
              {jobName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top10Filter;
