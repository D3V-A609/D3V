import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { fetchUserInfo } from "../../store/actions/userActions";
import { UserState } from "../../store/slices/userSlice";
import SecureStorage from "../../store/services/token/SecureStorage";

interface UserInfoProps {
  className?: string;  // className을 선택적으로 받을 수 있도록 설정
}

const UserProfileImg: React.FC<UserInfoProps> = ({className}) => {

  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.user as UserState)

  const nicknameInitial = me?.nickname?.[0]?.toUpperCase() ?? "D3V";

  const memberId = SecureStorage.getMemberId();


  useEffect(()=>{
    if(memberId !== null && memberId !== 0){
      dispatch(fetchUserInfo(memberId))
    }
  }, [dispatch, memberId])

  // const {}
  return (
      <div className={`header-container_user-avatar ${className || ""}`}>
        <div className="profile-avatar">
          {me?.profileImg ? (
            <img src={me.profileImg} alt="프로필" className="" />
          ) : (
            <div className="avatar-fallback">{nicknameInitial}</div>
          )}
        </div>
    </div>
  );
};

export default UserProfileImg;
