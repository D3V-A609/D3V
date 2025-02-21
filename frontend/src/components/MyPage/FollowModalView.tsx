import React, { useEffect, useRef } from 'react';
import styles from './FollowModalView.module.css';

import { BsPeopleFill } from "react-icons/bs";

import fire_true from '../../assets/images/navbar/fire-true.png';
import fire_false from '../../assets/images/navbar/fire-false.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks/useRedux';
import { fetchUserFollowers, fetchUserFollowings } from '../../store/actions/userActions';
import { shallowEqual } from 'react-redux';
import { moveToOtherProfile } from '../../utils/navigation';
import { useNavigate } from 'react-router-dom';

interface FollowProp {
  onClose: () => void;
  mode: string;
  onUnfollow: (id: number) => void;
  onFollow: (id: number) => void;
  memberId: number | null;
}

const FollowModalView:React.FC<FollowProp> = ({onClose, mode, onUnfollow, onFollow, memberId}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUnfollow = async (memberId: number) => {
    if (window.confirm('정말로 팔로우를 취소하시겠습니까?')) {
      onUnfollow(memberId);
    }
  };

  const { followers, followings } = useAppSelector((state) => state.user, shallowEqual)
  const follows = mode === 'follower' ? followers : followings;

  const hasFetched = useRef(false);

  useEffect(() =>{
    if(memberId !== null && memberId !== 0 && !hasFetched.current){
      hasFetched.current = true;
      Promise.all([
        dispatch(fetchUserFollowers(memberId)),
        dispatch(fetchUserFollowings(memberId)),
      ])
    }
  }, [dispatch])
  
  return(
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div className={styles['modal-content']}>
      <button className={styles["modal-close-btn"]} onClick={onClose}>×</button>
      <div className={styles["content-header"]}>
        <div className={styles["content-title"]}>
          <span className={styles["content-title-icon"]}><BsPeopleFill size={28} color='#0072EF'/></span> 
          <span className={styles["content-title-text"]}>{mode==="follower"? 'FOLLOWER 목록' : 'FOLLOWING 목록'}</span>
        </div>
      </div>
      <hr />
      
      <ul className={styles["follow-list"]}>
          {follows.map((user) => (
            <li key={user.memberId} className={styles["follow-item"]}>
              <div className={styles["follow-item-left"]} onClick={() =>moveToOtherProfile(navigate, user.memberId)}>
                <div className="profile-avatar">
                  {user.profileImg && user.profileImg !== '' ? (
                    <img src={user.profileImg} alt="프로필" />
                  ) : (
                    <div className="avatar-fallback">{user.nickname[0].toUpperCase()}</div>
                  )}
                </div>
                <div className={styles["user-info"]}>
                  <div className={styles["user-name-streak"]}>
                    <div className={styles["user-name"]} >{user.nickname}</div>
                    <div className={styles["streak"]}>
                      {user.ongoningStreak > 0 ? 
                      <>
                      <img src={fire_true} className={styles['streak-img']} />
                      <div className={styles['text-red']}>+ {user.ongoningStreak}일</div>
                      </> : 
                      <img src={fire_false} className={styles['streak-img']} />}
                    </div>
                  </div>
                  {user.favoriteJob ? <div className={styles["user-job"]}>[{user.favoriteJob}] Developer</div> : <div className={styles["user-job"]}>Developer</div>}
                </div>
              </div>
              <div className={styles["follow-item-right"]}>
                {followings.some(f => f.memberId === user.memberId) ?  <button className={styles["unfollow-btn"]} onClick={() => handleUnfollow(user.memberId)}>Unfollow</button> :
                <button className={styles["unfollow-btn"]} onClick={() => onFollow(user.memberId)}>Follow</button>
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default React.memo(FollowModalView);