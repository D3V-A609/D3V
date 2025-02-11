import React from "react";

interface UserInfoProps {
  className?: string;  // className을 선택적으로 받을 수 있도록 설정
}

const UserProfileImg: React.FC<UserInfoProps> = ({className}) => {
  return (
      <div className={`header-container_user-avatar ${className || ""}`}>D3V</div>
  );
};

export default UserProfileImg;
