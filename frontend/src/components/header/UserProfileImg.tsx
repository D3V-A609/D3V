import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { fetchUserInfo } from "../../store/actions/userActions";
import { UserState } from "../../store/slices/userSlice";

interface UserInfoProps {
  className?: string;  // className을 선택적으로 받을 수 있도록 설정
}

const UserProfileImg: React.FC<UserInfoProps> = ({className}) => {

  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.user as UserState)

  useEffect(()=>{
    dispatch(fetchUserInfo(null))
  }, [])

  // const {}
  return (
      <div className={`header-container_user-avatar ${className || ""}`}>
        <div className="profile-avatar">
          {me?.profileImg ? (
            <img src={me.profileImg} alt="프로필" />
          ) : (
            <div className="avatar-fallback">{me?.nickname[0].toUpperCase()}</div>
          )}
        </div>
    </div>
  );
};

export default UserProfileImg;
