import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCurrentStep, updateSignupForm } from "../../../store/slices/authSlice";
import authApi from '../../../store/services/authApi';
import "./Step2.css";

const Step2: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const [nickname, setNickname] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const MAX_FILE_SIZE_MB = 5;
  const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // 파일 크기 검증
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`파일 크기는 ${MAX_FILE_SIZE_MB}MB 이하여야 합니다.`);
        return;
      }

      // 확장자 검증
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
        alert('허용되지 않는 파일 형식입니다. jpg, jpeg, png, gif 파일만 업로드 가능합니다.');
        return;
      }

      setProfileImage(file);
    }
  };

  // 닉네임 중복 검사
  const handleNicknameBlur = async () => {
    if (!nickname.trim()) {
      return;
    }

    try {
      const response = await authApi.checkNicknameDuplication(nickname);
      if (response.result) { // true면 중복
        setError(response.message);
        setMessage('');
      } else { // false면 사용 가능
        setMessage('사용 가능한 닉네임입니다.');
        setError('');
      }
    } catch (error) {
      setError('닉네임 중복 확인에 실패했습니다.');
      setMessage('');
    }
  };

  const validateForm = async () => {
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return false;
    }

    try {
      const response = await authApi.checkNicknameDuplication(nickname);
      if (response.result) {
        setError(response.message);
        return false;
      }
      return true;
    } catch (error) {
      setError('닉네임 중복 확인에 실패했습니다.');
      return false;
    }
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (await validateForm()) {
      dispatch(updateSignupForm({
        nickname,
        githubUrl,
        profileImage,
      }));
      dispatch(setCurrentStep(3));      
      navigate('/auth/signup/complete');
    }
  };

  return (
    <div className="signup-step">
      <h2>프로필 설정</h2>
      <p className="signup-description">
        닉네임은 필수입니다. 프로필 사진과 Github 아이디는 선택사항입니다.
      </p>
      <form onSubmit={handleNext}>
        <div className="profile-upload">
          <div className="profile-image-container">
            {profileImage ? (
              <img src={URL.createObjectURL(profileImage)} alt="Profile Preview" />
            ) : (
              <div className="profile-placeholder">
                <span>+</span>
              </div>
            )}
          </div>
          <label htmlFor="profile-upload" className="upload-button">
            프로필 사진 선택 (선택사항)
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div className="signup-form-group">
          <label>닉네임 *</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={handleNicknameBlur}
            placeholder="닉네임을 입력해주세요"
            required
          />
          {error && <span className="signup-error-message">{error}</span>}
          {message && <span className="signup-success-message">{message}</span>}
        </div>
        <div className="signup-form-group">
          <label>Github 아이디 (선택사항)</label>
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="Github 아이디를 입력해주세요"
          />
        </div>
        <button type="submit" className="next-button">
          다음
        </button>
      </form>
    </div>
  );
};

export default Step2;
