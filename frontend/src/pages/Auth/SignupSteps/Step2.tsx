import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCurrentStep, updateSignupForm } from "../../../store/slices/authSlice";
import "./Step2.css";

const Step2: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const [nickname, setNickname] = useState('');
  const [githubUrl, setgithubUrl] = useState('');

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

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      // Redux store에는 기본 정보만 저장
      dispatch(updateSignupForm({
        nickname,
        githubUrl,
        profileImage, // 이미지 파일도 함께 저장
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
        <div className="form-group">
          <label>닉네임 *</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
            required
          />
        </div>
        <div className="form-group">
          <label>Github 아이디 (선택사항)</label>
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setgithubUrl(e.target.value)}
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
