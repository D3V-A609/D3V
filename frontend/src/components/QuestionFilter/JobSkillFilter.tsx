// components/JobSkillFilter.tsx
import React from 'react';
import './JobSkillFilter.css';

interface JobSkillFilterProps {
  jobFilter: JobType[];
  skillFilter: SkillType[];
  jobs: JobType[];
  skills: SkillType[];
  onJobFilterChange: (jobs: JobType[]) => void;
  onSkillFilterChange: (skills: SkillType[]) => void;
  onReset: () => void;
}

const JobSkillFilter: React.FC<JobSkillFilterProps> = ({
  jobFilter,
  skillFilter,
  jobs,
  skills,
  onJobFilterChange,
  onSkillFilterChange,
  onReset,
}) => {
  const handleJobClick = (jobName: JobType) => {
    const newJobFilter = jobFilter.includes(jobName)
      ? jobFilter.filter(job => job !== jobName)
      : [...jobFilter, jobName];
    
    onJobFilterChange(newJobFilter);
    
    // 직무가 선택 해제되면 해당 직무의 기술도 선택 해제
    if (jobFilter.includes(jobName)) {
      const skillsToRemove = skills.filter(skill => 
        !newJobFilter.includes(skill));
      onSkillFilterChange(
        skillFilter.filter(skill => !skillsToRemove.includes(skill))
      );
    }
  };

  const handleSkillClick = (skillName: SkillType) => {
    const newSkillFilter = skillFilter.includes(skillName)
      ? skillFilter.filter(skill => skill !== skillName)
      : [...skillFilter, skillName];
    onSkillFilterChange(newSkillFilter);
  };

  const handleReset = () => {
    onJobFilterChange([]);
    onSkillFilterChange([]);
    onReset(); // 상위 컴포넌트의 리셋 핸들러 호출
  };

  return (
    <div className="filter-container">
      <div className="filter-section">
        <div className="filter-buttons">
          {jobs.map((job) => (
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

      {jobFilter.length > 0 && skills.length > 0 && (
        <div className="filter-section has-selected-job">
          <h3 className="skill-section-title">기술 선택란</h3>
          <div className="filter-buttons">
            {skills.map((skill) => (
              <button
                key={skill}
                className={`filter-button ${skillFilter.includes(skill) ? "active" : ""}`}
                onClick={() => handleSkillClick(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {(jobFilter.length > 0 || skillFilter.length > 0) && (
        <div className="filter-footer">
          <button className="reset-button" onClick={handleReset}>
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default JobSkillFilter;