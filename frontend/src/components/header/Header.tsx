import React from "react";

import { useNavigate } from "react-router-dom";

import "./Header.css";

import Logo from "../../assets/images/logo.svg";

import Nav from "./Nav.tsx";
import SimpleUserInfo from "./SimpleUserInfo.tsx";

const Header: React.FC = () => {

  const navigate = useNavigate();

  const handleLogoClick = () => { // 로고 클릭 시 home으로 이동
    navigate("/");
  }
  return (
    <header className="header-container">
      <div className="header-container_logo-div">
        <img src={Logo} className="header-container_logo-svg" onClick={() => { handleLogoClick() }} />
      </div>
      <div className="header-container_right">
        <SimpleUserInfo />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
