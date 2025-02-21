import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInfoComp.css'
// import UserProfileImg from '../../components/header/UserProfileImg';
import { IoLogoGithub } from "react-icons/io";
import { CiMail } from "react-icons/ci";
// import Profile from '../../components/Profile/Profile';

interface UserInfoProps {
  user: User | null;
  openFollowModal: (mode: string) => void;
  onUnfollow?: (memberId: number) => void;
  onFollow?: (memberId: number) => void;
}
const UserInfoComp: React.FC<UserInfoProps> = ({ user, openFollowModal, onUnfollow, onFollow }) => {
  const navigate = useNavigate();

  useEffect(() => {}, [user])

  if(!user){
    return <div style={{padding: "1rem 0"}}>사용자 정보를 불러오는 중입니다..</div>
  }

  const openFollowModalView = (count: number, mode: string) => {
    if(count > 0) return openFollowModal(mode);
  }

  const nicknameInitial = user?.nickname?.[0]?.toUpperCase() ?? "D3V";

  // 프로필 수정 버튼 클릭 핸들러
  const handleEditProfile = () => {
    navigate('/my/edit');
  };

  return (
    <div className='user-detail-info-container'>
      {/* 왼쪽 프로필 이미지 */}
      <div className="profile-image-container">
        {/* <img src={user.profileImage} alt="프로필" className="profile-image" /> */}
        {/* <UserProfileImg className="profile-image" /> */}
        {/* <div className="profile-avatar"> */}
        {user.profileImg ? (
          <img src={user.profileImg} className='profile-image' alt="프로필" />
        ) : (
          <div className="avatar-fallback">{nicknameInitial}</div>
        )}
      {/* </div> */}
      </div>

      {/* 오른쪽 유저 정보 */}
      <div className="user-info-content">
        <div className="user-top-section">
          <div className="user-name">{user.nickname}<span className='text-black-title'>님</span></div>
        </div>

        <div className="user-sub-info">
          <div className="user-sub-info-left">
            {user.favoriteJob? <span className="nickname">[<span className='text-blue'>{user.favoriteJob}</span>] developer</span> : <span className='text-blue'>개발자(D3V)</span>}
            <p className='mail-info'>
              <CiMail /> <span style={{ color: '#0072EF' }}>{user.email}</span>
            </p>
          </div>
          <div className='user-sub-info-right'>
            <span className="followers">
              <span className="label">팔로워</span>
              <span className="value text-blue" onClick={() => openFollowModalView(user.followerCount, 'follower')}>{user.followerCount}</span>
              <span className="separator">|</span>
              <span className="label">팔로잉</span>
              <span className="value text-blue" onClick={() => openFollowModalView(user.followingCount, 'following')}>{user.followingCount}</span>
            </span>

            <p >
              {user.githubUrl && <a href={`${user.githubUrl}`} target="_blank" rel="noopener noreferrer" className='github-info'>
                <IoLogoGithub className='github-icon' /> <span style={{ color: '#0072EF' }}>{user.githubUrl}</span>
              </a>}
            </p>
          </div>
        </div>
      </div>
      <div className='update-user-info-btn'>
        {user.isFollow === null ?
        <button className="edit-button" onClick={handleEditProfile}>프로필 수정</button> :(
      user.isFollow === true ? 
      <button className='edit-button' onClick={() => onUnfollow?.(user.memberId)}>Unfollow</button> :
      <button className='edit-button' onClick={() => onFollow?.(user.memberId)}>Follow</button>)
    }
      </div>
    </div>
  )
}

export default UserInfoComp;