import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Step2.css";

const Step2: React.FC = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [nickname, setNickname] = useState('');
  const [githubId, setGithubId] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) { // 닉네임만 필수값 체크
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
            value={githubId}
            onChange={(e) => setGithubId(e.target.value)}
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
