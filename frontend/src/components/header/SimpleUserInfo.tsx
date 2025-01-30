import React from "react";

const SimpleUserInfo: React.FC = () => {
  return (
    <div className="header-container_user-info">
      <div className="header-container_user-info_text">
        <span className="header-container_user-role">[<span className="text-blue1">Full Stack</span>] D<span style={{fontSize:'9px'}}>3</span>V </span>
        <span className="header-container_user-name_"><span className="text-blue3 text-bolder header-container_user-name">Developer</span> 님</span>
      </div>
      <div className="header-container_user-avatar">D3V</div>
    </div>
  );
};

export default SimpleUserInfo;
