// Step1.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCurrentStep, updateSignupForm } from "../../../store/slices/authSlice";
import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import authApi from '../../../store/services/authApi';
import './Step1.css';

const Step1: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: ''
  });

  // 이메일 인증 관련 상태
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [isEmailVerificationSent, setIsEmailVerificationSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // 이메일 중복 검사
  const handleEmailBlur = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      return;
    }
  
    try {
      const response = await authApi.checkEmailDuplication(formData.email);
      if (response.result) {
        setErrors(prev => ({...prev, email: response.message}));
      } else {
        setErrors(prev => ({...prev, email: '사용 가능한 이메일입니다.'}));
      }
    } catch (error) {
      console.error('이메일 중복 확인 실패:', error);
      setErrors(prev => ({...prev, email: '이메일 중복 확인에 실패했습니다.'}));
    }
  };

  const sendEmailVerification = async () => {
    if (!formData.email) {
      setErrors(prev => ({...prev, email: '이메일을 입력해주세요'}));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors(prev => ({...prev, email: '유효한 이메일 주소를 입력해주세요'}));
      return;
    }

    try {
      await authApi.sendEmailVerification(formData.email);
      setShowVerificationInput(true);
      setIsEmailVerificationSent(true);
      alert('인증 이메일이 발송되었습니다. 이메일을 확인해주세요.');
    } catch (error) {
      console.error('이메일 인증 발송 실패:', error);
      alert('이메일 인증 발송에 실패했습니다.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await authApi.verifyEmailCode(formData.email, verificationCode);
      if (response) {
        setIsEmailVerified(true);
        setShowVerificationInput(false);
        alert('이메일 인증이 완료되었습니다.');
      } else {
        alert('잘못된 인증 코드입니다.');
      }
    } catch (error) {
      console.error('인증 코드 확인 실패:', error);
      alert('인증 코드 확인에 실패했습니다.');
    }
  };

  const validateForm = async () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: ''
    };

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요';
      isValid = false;
    } else {
      try {
        const response = await authApi.checkEmailDuplication(formData.email);
        if (response.result) {
          newErrors.email = response.message;
          isValid = false;
        }
      } catch (error) {
        newErrors.email = '이메일 중복 확인에 실패했습니다.';
        isValid = false;
      }
    }

    if (!isEmailVerified) {
      newErrors.email = '이메일 인증이 필요합니다';
      isValid = false;
    }

    // 비밀번호 유효성 검사
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = '영문, 숫자, 특수문자만 입력 가능합니다';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다';
      isValid = false;
    }

    // 비밀번호 확인 검사
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
      isValid = false;
    }

    // 약관 동의 검사
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = '개인정보 수집 및 이용에 동의해주세요';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await validateForm()) {
      dispatch(updateSignupForm({
        email: formData.email,
        password: formData.password
      }));
      dispatch(setCurrentStep(2));
      navigate('/auth/signup/profile');
    }
  };

  return (
    <div className="signup-step">
      <h2>계정 만들기</h2>
      <p className="signup-description">
        이메일과 비밀번호를 입력해주세요.
      </p>
      <form className="signup-from" onSubmit={handleNext}>
        <div className="signup-form-group">
          <label>이메일</label>
          <div className="email-input-wrapper">
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              onBlur={handleEmailBlur}
              placeholder="이메일 주소 *" 
              required 
            />
            <button 
              type="button"
              className={`verify-email-button ${isEmailVerified ? 'verified' : ''}`}
              onClick={sendEmailVerification}
              disabled={isEmailVerified}
            >
              {isEmailVerified ? '인증완료' : '이메일 인증'}
            </button>
          </div>
          
          {/* 인증 코드 입력 폼 */}
          {showVerificationInput && !isEmailVerified && (
            <div className="verification-code-wrapper">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증 코드 입력"
                className="verification-code-input"
              />
              <button 
                type="button"
                className="verify-code-button"
                onClick={handleVerifyCode}
              >
                확인
              </button>
            </div>
          )}

          {isEmailVerificationSent && !isEmailVerified && (
            <span className="signup-info-message">
              인증 이메일이 발송되었습니다. 이메일을 확인해주세요.
            </span>
          )}

          {errors.email && (
            <span className={errors.email === '사용 가능한 이메일입니다.' ? 'signup-success-message' : 'signup-error-message'}>
              {errors.email}
            </span>
          )}
        </div>

        <div className="signup-form-group">
          <label>비밀번호</label>
          <div className="password-input-wrapper">
            <input 
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="비밀번호 (영문, 숫자, 특수문자) *"
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
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="signup-form-group">
          <label>비밀번호 확인</label>
          <div className="password-input-wrapper">
            <input 
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="비밀번호 확인 *"
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoMdEye /> : <IoIosEyeOff />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className={errors.confirmPassword === '비밀번호가 일치합니다' ? 'signup-success-message' : 'error-message'}>
              {errors.confirmPassword}
            </span>
          )}
        </div>

        <div className="terms-group">
          <label className="terms-label">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
            />
            <span>개인정보 수집 및 이용에 동의합니다</span>
          </label>
          {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
        </div>

        <button type="submit" className="next-button">
          다음
        </button>
      </form>
    </div>
  );
};

export default Step1;
