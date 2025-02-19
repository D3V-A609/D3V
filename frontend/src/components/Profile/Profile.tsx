import React from "react";
import "./Profile.css";
import { moveToOtherProfile } from "../../utils/navigation";
import { useNavigate } from "react-router-dom";
import SecureStorage from "../../store/services/token/SecureStorage";

interface ProfileProps {
  profileImg?: string; // 프로필 이미지 URL
  favoriteJob?: string; // 직무
  nickname: string; // 닉네임
  userId: number;
}

const Profile: React.FC<ProfileProps> = ({ profileImg, favoriteJob, nickname, userId }) => {
  const myId = SecureStorage.getMemberId();
  const navigate = useNavigate();

  const moveToProfile = (userId: number) => {
    if(userId === Number(myId)) navigate('/my')
    else {moveToOtherProfile(navigate, userId)}
  } 

  return (
    <div className="profile-container" onClick={() =>moveToProfile(userId)}>
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