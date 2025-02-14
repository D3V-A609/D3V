// features/Auth/layouts/SignupLayout.tsx
import React, { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import './SignupLayout.css'

const SignupLayout: React.FC = () => {
  const location = useLocation();
  const [step, setStep] = useState(1);
  
  const getCurrentStep = () => {
    switch (location.pathname) {
      case '/auth/signup':
        return { step: 1, backUrl: '/auth/login' };
      case '/auth/signup/profile':
        return { step: 2, backUrl: '/auth/signup' };
      case '/auth/signup/complete':
        return { step: 3, backUrl: '/auth/signup/profile' };
      default:
        return { step: 1, backUrl: '/auth/login' };
    }
  };

  const currentStep = getCurrentStep();

  return (
    <div className="signup-container">
      <div className="back-link">
        <Link to={currentStep.backUrl}>← 뒤로가기</Link>
      </div>
      <div className="signup-content">
        <div className="signup-progress">
          <div className="progress-steps">
            <div className={`step-item ${currentStep.step >= 1 ? 'active' : ''}`}>
              <div className="step-circle">1</div>
              <span>계정</span>
            </div>
            <div className={`step-item ${currentStep.step >= 2 ? 'active' : ''}`}>
              <div className="step-circle">2</div>
              <span>프로필</span>
            </div>
            <div className={`step-item ${currentStep.step >= 3 ? 'active' : ''}`}>
              <div className="step-circle">3</div>
              <span>직무</span>
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentStep.step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>
        <Outlet context={{ step, setStep }} />
      </div>
    </div>
  );
};

export default SignupLayout;
