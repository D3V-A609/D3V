import React from "react";

interface SimpleUserInfoProps {
  className?: string;  // className을 선택적으로 받을 수 있도록 설정
}

const SimpleUserInfo: React.FC<SimpleUserInfoProps> = ({className}) => {
  return (
      <div className={`header-container_user-avatar ${className || ""}`}>D3V</div>
  );
};

export default SimpleUserInfo;
