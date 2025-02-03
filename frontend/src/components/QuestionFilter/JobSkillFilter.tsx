// components/QuestionFilter/JobSkillFilter.tsx
import React from "react";
import "./JobSkillFilter.css";

/**
 * JobSkillFilter 컴포넌트의 props 인터페이스
 * @param jobFilter 선택된 직무 필터 배열
 * @param skillFilter 선택된 기술 필터 배열
 * @param jobCategories 직무 카테고리 목록
 * @param onJobFilterChange 직무 필터 변경 콜백
 * @param onSkillFilterChange 기술 필터 변경 콜백
 */
interface JobSkillFilterProps {
  jobFilter: string[];
  skillFilter: string[];
  jobCategories: JobCategory[];
  onJobFilterChange: (jobs: string[]) => void;
  onSkillFilterChange: (skills: string[]) => void;
}

/**
 * 직무와 기술 필터링을 위한 컴포넌트
 */
const JobSkillFilter: React.FC<JobSkillFilterProps> = ({
  jobFilter,
  skillFilter,
  jobCategories,
  onJobFilterChange,
  onSkillFilterChange,
}) => {
  /**
   * 직무 선택/해제 핸들러
   * @param jobName 선택/해제할 직무명
   */
  const handleJobClick = (jobName: string) => {
    const newJobFilter = jobFilter.includes(jobName)
      ? jobFilter.filter((job) => job !== jobName)
      : [...jobFilter, jobName];

    onJobFilterChange(newJobFilter);

    // 직무가 선택 해제되면 해당 직무의 기술도 선택 해제
    if (jobFilter.includes(jobName)) {
      const jobCategory = jobCategories.find((c) => c.name === jobName);
      const skillsToRemove = jobCategory?.skills || [];
      onSkillFilterChange(
        skillFilter.filter((skill) => !skillsToRemove.includes(skill))
      );
    }
  };

  /**
   * 기술 선택/해제 핸들러
   * @param skillName 선택/해제할 기술명
   */
  const handleSkillClick = (skillName: string) => {
    const newSkillFilter = skillFilter.includes(skillName)
      ? skillFilter.filter((skill) => skill !== skillName)
      : [...skillFilter, skillName];
    onSkillFilterChange(newSkillFilter);
  };

  /**
   * 필터 초기화 핸들러
   */
  const handleReset = () => {
    onJobFilterChange([]);
    onSkillFilterChange([]);
  };

  /**
   * 선택된 직무에 해당하는 기술 목록 생성
   * useMemo를 사용하여 성능 최적화
   */
  const availableSkills = React.useMemo(() => {
    const skills = new Set<string>();
    jobFilter.forEach((job) => {
      const jobCategory = jobCategories.find((c) => c.name === job);
      jobCategory?.skills.forEach((skill) => skills.add(skill));
    });
    return Array.from(skills);
  }, [jobFilter, jobCategories]);

  return (
    <div className="filter-container">
      {/* 직무 선택 섹션 */}
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
  
      {/* 기술 선택 섹션 - 직무가 선택된 경우에만 표시 */}
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
      
      {/* 필터 초기화 버튼 - 필터가 선택된 경우에만 표시 */}
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