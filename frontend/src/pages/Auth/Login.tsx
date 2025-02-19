import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { toast } from 'react-toastify';
// import SocialLogin from '../../components/Auth/SocialLogin';
import authApi from '../../store/services/authApi';
import tokenService from '../../store/services/token/tokenService';
import { loginSuccess, setError } from '../../store/slices/authSlice';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(value)) {
      setPassword(value);
    }
  };

  const handleCompositionStart = (e: React.CompositionEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  // 로그인 성공 시 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(setError(null)); // 에러 상태 초기화

      // 로그인 API 호출
      const response = await authApi.login({ email, password });

      // // 로그인 유지 체크박스가 체크된 경우 useAuth()를 하도록 함
      // if (rememberMe) {}

      // AccessToken을 저장
      tokenService.setAccessToken(response.result.AccessToken);

      // 로그인 성공 후 처리
      dispatch(loginSuccess({ 
        isAuthenticated: true,
        user: {
          memberId: response.result.memberId,
          nickname: response.result.nickname,
          email: response.result.email,
          profileImg: response.result.profileImg,
        }
      }));

      toast.success('로그인되었습니다.', {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        toastId: 'login-success'
      });

      navigate('/', { replace: true });
    } catch (error: unknown) {
      dispatch(setError('로그인에 실패했습니다.'));
      console.error('Login failed:', error);
      
      toast.error('로그인에 실패했습니다.', {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        toastId: 'login-error'
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
                required
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
                  required
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
              {/* <div className="remember-me">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">로그인 상태 유지</label>
              </div> */}
              <div className="forgot-password">
                <Link to="/auth/forgot-password">비밀번호를 잊으셨나요?</Link>
              </div>
            </div>
            <button type="submit" className="register-button">
              로그인하기
            </button>
            {/* <SocialLogin /> */}
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
