//pages/Auth/Login.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from '../../components/Auth/SocialLogin';
import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import './Login.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import authApi from '../../store/services/authApi';
import tokenService from '../../store/services/token/tokenService';
import { loginSuccess } from '../../store/slices/authSlice';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


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

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // 로딩 토스트 표시 (선택사항)
        // toast.loading('로그인 중...', { toastId: 'login-loading' });

        const response = await authApi.login({ email, password });
        
        // AccessToken 저장 (tokenService 사용)
        tokenService.setAccessToken(response.result.AccessToken);
        
        // Redux store 업데이트
        dispatch(loginSuccess({ 
          isAuthenticated: true,
          user: {
            memberId: response.result.memberId,
            nickname: response.result.nickname,
            email: response.result.email,
            profileImg: response.result.profileImg,
          }
        }));
    
        // 로딩 토스트 제거 (선택사항)
        // toast.dismiss('login-loading');

        // 성공 토스트 표시 (시간 단축)
        toast.success('로그인되었습니다.', {
          position: "top-right",
          autoClose: 1000, // 500ms로 단축
          hideProgressBar: true, // 프로그레스바 숨김
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false, // 드래그 비활성화로 성능 개선
          toastId: 'login-success'
        });

        // 즉시 네비게이션
        navigate('/');
      } catch (error) {
        toast.error('로그인에 실패했습니다.', {
          autoClose: 500,
          hideProgressBar: true
        });
      }
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
