import React, { useEffect } from 'react';
import './UserInfoComp.css'
import UserProfileImg from '../../components/header/UserProfileImg';
import { FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

interface UserInfoProps {
  user: User | null;
}
const UserInfoComp: React.FC<UserInfoProps> = ({ user }) => {

  useEffect(() => {}, [user])

  if(!user){
    return <div>사용자 정보를 불러오는 중입니다..</div>
  }

  return (
    <div className='user-detail-info-container'>
      {/* 왼쪽 프로필 이미지 */}
      <div className="profile-image-container">
        {/* <img src={user.profileImage} alt="프로필" className="profile-image" /> */}
        <UserProfileImg className="profile-image" />
      </div>

      {/* 오른쪽 유저 정보 */}
      <div className="user-info-content">
        <div className="user-top-section">
          <div className="user-name">{user.nickname}<span className='text-black-title'>님</span></div>
        </div>

        <div className="user-sub-info">
          <div className="user-sub-info-left">
            <span className="nickname">[<span className='text-blue'>{user.favoriteJob}</span>] developer</span>
            <p className='mail-info'>
              <CiMail /> <span style={{ color: '#0072EF' }}>{user.email}</span>
            </p>
          </div>
          <div className='user-sub-info-right'>
            <span className="followers">
              <span className="label">팔로워</span>
              <span className="value text-blue">{user.followerCount}</span>
              <span className="separator">|</span>
              <span className="label">팔로잉</span>
              <span className="value text-blue">{user.followingCount}</span>
            </span>

            <p >
              <a href={`https://${user.githubUrl}`} target="_blank" rel="noopener noreferrer" className='github-info'>
                <FaGithub /> <span style={{ color: '#0072EF' }}>{user.githubUrl}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className='update-user-info-btn'>
      <button className="edit-button">프로필 수정</button>
      </div>
    </div>
  )
}

export default UserInfoComp;