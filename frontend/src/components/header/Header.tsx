import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // 햄버거 메뉴 아이콘

import "./Header.css";

import Logo from "../../assets/images/logo.gif";

import Nav from "./Nav.tsx";
import SimpleUserInfo from "./SimpleUserInfo.tsx";

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogoClick = () => { // 로고 클릭 시 home으로 이동
    navigate("/");
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleClose = () =>{
    if(isNavOpen){
      setIsNavOpen(!isNavOpen)
    }
  }


  return (
    <header className="header-container">
      <div className="header-container_logo-div">

        {/* 햄버거 메뉴 버튼 */}
        <div className="hamburger-menu" onClick={toggleNav}>
          {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        <img src={Logo} className="header-container_logo-svg" onClick={() => { handleLogoClick() }} />
      </div>

      <nav
        className={`header-container_nav-section ${
          isNavOpen ? "active" : ""
        }`}
      >
        <Nav toggleClose={toggleClose} />
      </nav>
      <div className="header-user-profile">
        <SimpleUserInfo />  
      </div>
    </header>
  );
};

export default Header;
