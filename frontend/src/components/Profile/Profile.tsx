import React from "react";
import "./Profile.css";

interface ProfileProps {
  profileImg?: string; // 프로필 이미지 URL
  favoriteJob?: string; // 직무
  nickname: string; // 닉네임
}

const Profile: React.FC<ProfileProps> = ({ profileImg, favoriteJob, nickname }) => {
  return (
    <div className="profile-container">
      {/* 프로필 이미지 */}
      <div className="profile-avatar">
        {profileImg ? (
          <img src={profileImg} alt="프로필" />
        ) : (
          <div className="avatar-fallback">{nickname[0].toUpperCase()}</div>
        )}
      </div>

      {/* 프로필 정보 */}
      <div className="profile-info">
        {favoriteJob && (
          <div className="profile-role">
            <span className="role-name">{favoriteJob || '\u00A0'}</span>
          </div>
        )}
        <div className="profile-name">
          <span className="name">{nickname || '익명 사용자'}</span>
          <span className="suffix">님</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;