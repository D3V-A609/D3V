//pages/Auth/Login.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from '../../components/Auth/SocialLogin';
import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 영문, 숫자, 특수문자만 허용하는 정규식
    if (/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(value)) {
      setPassword(value);
    }
  };

  // 한글 입력 시작 시 이벤트 처리
  const handleCompositionStart = (e: React.CompositionEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="back-link">
        <Link to="/">← 뒤로가기</Link>
      </div>
      <div className="login-content">
        <div className="login-form-wrapper">
          <h1>로그인</h1>
          <p className="login-description">
            이미 회원이신 경우 이메일과 비밀번호로 로그인하실 수 있습니다.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>이메일</label>
              <input
                type="email"
                placeholder="이메일 주소 *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>비밀번호</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호 (영문, 숫자, 특수문자) *"
                  value={password}
                  onChange={handlePasswordChange}
                  onCompositionStart={handleCompositionStart}
                  autoComplete="off"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
                </button>
              </div>
            </div>
            <div className="login-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">로그인 상태 유지</label>
              </div>
              <div className="forgot-password">
                <Link to="/auth/forgot-password">비밀번호를 잊으셨나요?</Link>
              </div>
            </div>
            <button type="submit" className="register-button">
              로그인하기
            </button>
            <SocialLogin />
            <div className="signup-prompt">
              계정이 없으신가요? <Link to="/auth/signup">회원가입</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
