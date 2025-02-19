import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCurrentStep, updateSignupForm } from "../../../store/slices/authSlice";
import authApi from '../../../store/services/authApi';
import "./Step2.css";

// Constants
const CONSTANTS = {
  MAX_FILE_SIZE_MB: 5,
  ALLOWED_EXTENSIONS: ["jpg", "jpeg", "png", "gif"],
  GITHUB_URL_PATTERN: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/,
} as const;

type AllowedExtension = typeof CONSTANTS.ALLOWED_EXTENSIONS[number];

// Types
interface ProfileState {
  profileImage?: File;
  nickname: string;
  githubUrl: string;
}

interface ValidationMessages {
  error: string;
  success: string;
  githubError: string;
}

const Step2: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [profileData, setProfileData] = useState<ProfileState>({
    profileImage: undefined,
    nickname: '',
    githubUrl: '',
  });

  const [messages, setMessages] = useState<ValidationMessages>({
    error: '',
    success: '',
    githubError: '',
  });

  // Validation functions
  const validateImage = (file: File): boolean => {
    if (file.size > CONSTANTS.MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`파일 크기는 ${CONSTANTS.MAX_FILE_SIZE_MB}MB 이하여야 합니다.`);
      return false;
    }

    const extension = file.name.split('.').pop()?.toLowerCase() as string;
    const isValidExtension = CONSTANTS.ALLOWED_EXTENSIONS.includes(extension as AllowedExtension);
    
    if (!extension || !isValidExtension) {
      alert('허용되지 않는 파일 형식입니다. jpg, jpeg, png, gif 파일만 업로드 가능합니다.');
      return false;
    }

    return true;
  };


  const validateGithubUrl = (url: string): boolean => {
    if (!url) return true;
    return CONSTANTS.GITHUB_URL_PATTERN.test(url);
  };

  // Event handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateImage(file)) {
      setProfileData(prev => ({ ...prev, profileImage: file }));
    }
  };

  const handleNicknameBlur = async () => {
    if (!profileData.nickname.trim()) return;

    try {
      const response = await authApi.checkNicknameDuplication(profileData.nickname);
      setMessages(prev => ({
        ...prev,
        error: response.result ? response.message : '',
        success: response.result ? '' : '사용 가능한 닉네임입니다.',
      }));
    } catch {
      setMessages(prev => ({
        ...prev,
        error: '닉네임 중복 확인에 실패했습니다.',
        success: '',
      }));
    }
  };

  const handleGithubUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setProfileData(prev => ({ ...prev, githubUrl: url }));
    setMessages(prev => ({
      ...prev,
      githubError: url && !validateGithubUrl(url) ? '올바른 GitHub 프로필 URL을 입력해주세요' : '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileData.nickname.trim()) {
      setMessages(prev => ({ ...prev, error: '닉네임을 입력해주세요.' }));
      return;
    }

    if (profileData.githubUrl && !validateGithubUrl(profileData.githubUrl)) {
      return;
    }

    try {
      const response = await authApi.checkNicknameDuplication(profileData.nickname);
      if (!response.result) {
        dispatch(updateSignupForm(profileData));
        dispatch(setCurrentStep(3));
        navigate('/auth/signup/complete');
      } else {
        setMessages(prev => ({ ...prev, error: response.message }));
      }
    } catch {
      setMessages(prev => ({ ...prev, error: '닉네임 중복 확인에 실패했습니다.' }));
    }
  };

  return (
    <div className="signup-step">
      <h2>프로필 설정</h2>
      <p className="signup-description">
        닉네임은 필수입니다. 프로필 사진과 Github 아이디는 선택사항입니다.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="profile-upload">
          <div className="profile-image-container">
            {profileData.profileImage ? (
              <img src={URL.createObjectURL(profileData.profileImage)} alt="Profile Preview" />
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
            value={profileData.nickname}
            onChange={(e) => setProfileData(prev => ({ ...prev, nickname: e.target.value }))}
            onBlur={handleNicknameBlur}
            placeholder="닉네임을 입력해주세요"
            required
          />
          {messages.error && <span className="signup-error-message">{messages.error}</span>}
          {messages.success && <span className="signup-success-message">{messages.success}</span>}
        </div>
        <div className="signup-form-group">
          <label>Github 주소 (선택사항)</label>
          <input
            type="url"
            value={profileData.githubUrl}
            onChange={handleGithubUrlChange}
            placeholder="https://github.com/username"
          />
          {messages.githubError && <span className="signup-error-message">{messages.githubError}</span>}
        </div>
        <button type="submit" className="next-button">
          다음
        </button>
      </form>
    </div>
  );
};

export default Step2;
