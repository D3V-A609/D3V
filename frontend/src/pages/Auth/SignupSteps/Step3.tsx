import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Step3.css";

const Step3: React.FC = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState('');

  const jobOptions = [
    "프론트엔드",
    "백엔드",
    "풀스택",
    "안드로이드",
    "iOS",
    "데브옵스 엔지니어",
    "기타"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 완료 처리
    navigate('/auth/login');
  };

  return (
    <div className="signup-step">
      <h2>마지막 단계</h2>
      <p className="signup-description">
        관심있는 직무를 선택해주세요.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>관심 직무</label>
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            required
          >
            <option value="">관심 직무를 선택해주세요</option>
            {jobOptions.map((job) => (
              <option key={job} value={job}>{job}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Step3;
