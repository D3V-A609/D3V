import React from "react";
import "./Header.css";

import header_hamburger from "../../assets/images/navbar/header-hamburger.png"
import main_logo from "../../assets/images/logo.png";

import "./Header.css";

// handleNavOpen 함수의 타입을 명시
interface HeaderProps {
    handleNavOpen: () => void;  // handleNavOpen은 인자를 받지 않고 반환값도 없는 함수
  }

const HeaderLogo:React.FC<HeaderProps> = ({handleNavOpen}) => {
    return (
        <div className="header-logo">
            <img src={header_hamburger} alt="header-hamburger" className="header-hamburger" onClick={handleNavOpen} />
            <img src={main_logo} alt="logo" className="logo" onClick={()=>{
                handleNavOpen();
                // 홈 화면으로 이동 로직 추가
            }}/>
        </div>
    );
}

export default HeaderLogo;