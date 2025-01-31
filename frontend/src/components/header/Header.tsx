import React from "react";
import "./Header.css";
import HeaderLogo from "./HeaderLogo.tsx";
import HeaderTitle from "./HeaderTitle.tsx";

// handleNavOpen 함수의 타입을 명시
interface HeaderProps {
  handleNavOpen: () => void;  // handleNavOpen은 인자를 받지 않고 반환값도 없는 함수
}

const Header: React.FC<HeaderProps> = ({ handleNavOpen }) => {
  return (
    <header className="header">
      <div className="header-content">
        <HeaderLogo handleNavOpen={handleNavOpen} />
        <HeaderTitle />
      </div>
    </header>
  );
};

export default Header;
