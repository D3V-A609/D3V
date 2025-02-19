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

  // 이메일 중복 검사
  const handleEmailBlur = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      return;
    }
  
    try {
      const response = await authApi.checkEmailDuplication(formData.email);
      if (response.result) { // true면 중복
        setErrors(prev => ({...prev, email: response.message}));
      } else { // false면 사용 가능
        setErrors(prev => ({...prev, email: '사용 가능한 이메일입니다.'}));
      }
    } catch (error) {
      console.error('이메일 중복 확인 실패:', error);
      setErrors(prev => ({...prev, email: '이메일 중복 확인에 실패했습니다.'}));
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
      // 이메일 중복 검사
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(value) || value === '') {
      setFormData({...formData, password: value});
      // 비밀번호가 일치하면 에러 메시지 제거
      if (value === formData.confirmPassword) {
        setErrors(prev => ({...prev, confirmPassword: '', password: ''}));
      }
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(value) || value === '') {
      setFormData({...formData, confirmPassword: value});
      
      // 비밀번호 확인이 비어있지 않은 경우에만 검증
      if (value !== '') {
        if (value === formData.password) {
          setErrors(prev => ({...prev, confirmPassword: '비밀번호가 일치합니다'}));
        } else {
          setErrors(prev => ({...prev, confirmPassword: '비밀번호가 일치하지 않습니다'}));
        }
      } else {
        // 입력값이 비어있으면 에러 메시지 제거
        setErrors(prev => ({...prev, confirmPassword: ''}));
      }
    }
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
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            onBlur={handleEmailBlur}
            placeholder="이메일 주소 *" 
            required 
          />
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
              onChange={handlePasswordChange}
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
              onChange={handleConfirmPasswordChange}
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
