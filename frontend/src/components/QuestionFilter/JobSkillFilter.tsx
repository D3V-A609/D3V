// components/QuestionFilter/JobSkillFilter.tsx
import React from "react";
import "./JobSkillFilter.css";

interface JobSkillFilterProps {
  jobFilter: string[];
  skillFilter: string[];
  jobCategories: JobCategory[];
  onJobFilterChange: (jobs: string[]) => void;
  onSkillFilterChange: (skills: string[]) => void;
}

const JobSkillFilter: React.FC<JobSkillFilterProps> = ({
  jobFilter,
  skillFilter,
  jobCategories,
  onJobFilterChange,
  onSkillFilterChange,
}) => {
  const handleJobClick = (jobName: string) => {
    const newJobFilter = jobFilter.includes(jobName)
      ? jobFilter.filter((job) => job !== jobName)
      : [...jobFilter, jobName];

    onJobFilterChange(newJobFilter);

    // 직무가 선택 해제되면 해당 직무의 스킬도 선택 해제
    if (jobFilter.includes(jobName)) {
      const jobCategory = jobCategories.find((c) => c.name === jobName);
      const skillsToRemove = jobCategory?.skills || [];
      onSkillFilterChange(
        skillFilter.filter((skill) => !skillsToRemove.includes(skill))
      );
    }
  };

  const handleSkillClick = (skillName: string) => {
    const newSkillFilter = skillFilter.includes(skillName)
      ? skillFilter.filter((skill) => skill !== skillName)
      : [...skillFilter, skillName];
    onSkillFilterChange(newSkillFilter);
  };

  const handleReset = () => {
    onJobFilterChange([]);
    onSkillFilterChange([]);
  };

  const availableSkills = React.useMemo(() => {
    const skills = new Set<string>();
    jobFilter.forEach((job) => {
      const jobCategory = jobCategories.find((c) => c.name === job);
      jobCategory?.skills.forEach((skill) => skills.add(skill));
    });
    return Array.from(skills);
  }, [jobFilter, jobCategories]);

  // components/QuestionFilter/JobSkillFilter.tsx
  return (
    <div className="filter-container">
      <div className="filter-section">
        <div className="filter-buttons">
          {jobCategories.map((job) => (
            <button
              key={job.name}
              className={`filter-button ${
                jobFilter.includes(job.name) ? "active" : ""
              }`}
              onClick={() => handleJobClick(job.name)}
            >
              {job.name}
            </button>
          ))}
        </div>
      </div>
  
      {jobFilter.length > 0 && (
        <div className="filter-section has-selected-job">
          <h3 className="skill-section-title">기술 선택란</h3>
          <div className="filter-buttons">
            {availableSkills.map((skill) => (
              <button
                key={skill}
                className={`filter-button ${
                  skillFilter.includes(skill) ? "active" : ""
                }`}
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
