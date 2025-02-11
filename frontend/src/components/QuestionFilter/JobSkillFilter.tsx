// components/JobSkillFilter.tsx
import React from 'react';
import './JobSkillFilter.css';

/**
 * JobSkillFilter 컴포넌트의 Props 인터페이스
 * @interface JobSkillFilterProps
 * @property {JobType[]} jobFilter - 현재 선택된 직무 필터 배열
 * @property {SkillType[]} skillFilter - 현재 선택된 기술 필터 배열
 * @property {JobType[]} jobs - 사용 가능한 전체 직무 목록
 * @property {SkillType[]} skills - 선택된 직무에 해당하는 기술 목록
 * @property {Function} onJobFilterChange - 직무 필터 변경 시 호출되는 콜백 함수
 * @property {Function} onSkillFilterChange - 기술 필터 변경 시 호출되는 콜백 함수
 * @property {Function} onReset - 필터 초기화 시 호출되는 콜백 함수
 */
interface JobSkillFilterProps {
  jobFilter: JobType[];
  skillFilter: SkillType[];
  jobs: JobType[];
  skills: SkillType[];
  onJobFilterChange: (jobs: JobType[]) => void;
  onSkillFilterChange: (skills: SkillType[]) => void;
  onReset: () => void;
}

/**
 * 직무와 기술 필터링을 위한 컴포넌트
 * 직무 선택 시 해당 직무에 관련된 기술 목록을 표시하고,
 * 선택된 필터에 따라 질문 목록을 필터링함
 */
const JobSkillFilter: React.FC<JobSkillFilterProps> = ({
  jobFilter,
  skillFilter,
  jobs,
  skills,
  onJobFilterChange,
  onSkillFilterChange,
  onReset,
}) => {
  /**
   * 직무 버튼 클릭 핸들러
   * @param jobName - 클릭된 직무 이름
   */
  const handleJobClick = (jobName: JobType) => {
    // 직무가 이미 선택되어 있으면 제거, 아니면 추가
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

  /**
   * 기술 버튼 클릭 핸들러
   * @param skillName - 클릭된 기술 이름
   */
  const handleSkillClick = (skillName: SkillType) => {
    // 기술이 이미 선택되어 있으면 제거, 아니면 추가
    const newSkillFilter = skillFilter.includes(skillName)
      ? skillFilter.filter(skill => skill !== skillName)
      : [...skillFilter, skillName];
    onSkillFilterChange(newSkillFilter);
  };

  /**
   * 필터 초기화 핸들러
   * 모든 직무와 기술 필터를 초기화
   */
  const handleReset = () => {
    onReset(); // 상위 컴포넌트의 리셋 핸들러 호출
  };

  return (
    <div className="filter-container">
      {/* 직무 필터 섹션 */}
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

      {/* 기술 필터 섹션 - 직무가 선택되었을 때만 표시 */}
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

      {/* 필터 초기화 버튼 - 필터가 적용되었을 때만 표시 */}
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
