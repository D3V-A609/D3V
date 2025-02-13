import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // 햄버거 메뉴 아이콘

import "./Header.css";

import Logo from "../../assets/images/logo.gif";
import Nav from "./Nav.tsx";
import UserProfileImg from "./UserProfileImg.tsx";

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleUserInfo = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navToggleClose = () => {
    if (isNavOpen) {
      setIsNavOpen(!isNavOpen);
    }
  };

  const logout = () => {
    setIsLogined(false);
    setIsUserInfoOpen(false);
    navigate("/");
  };

  const login = () => {
    setIsLogined(true);
    setIsUserInfoOpen(false); // 로그인 시 드롭다운 닫기
  };

  const goMyPage = () => {
    navigate('/my');
    setIsUserInfoOpen(false);
  }

  return (
    <header className="header-container">
      <div className="header-container_logo-div">
        {/* 햄버거 메뉴 버튼 */}
        <div className="hamburger-menu" onClick={toggleNav}>
          {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        <img
          src={Logo}
          className="header-container_logo-svg"
          onClick={handleLogoClick}
        />
      </div>

      <nav
        className={`header-container_nav-section ${
          isNavOpen ? "active" : ""
        }`}
      >
        <Nav toggleClose={navToggleClose} />
      </nav>

      {/* 유저 프로필 및 로그인 상태 */}
      <div className="header-user-profile">
        {isLogined ? (
          <>
            {/* SimpleUserInfo 클릭 시 유저 드롭다운 토글 */}
            <div onClick={toggleUserInfo}>
              <UserProfileImg />
            </div>
            {isUserInfoOpen && (
              <div className="user-info-dropdown">
                <ul>
                  <li onClick={goMyPage}>마이 페이지</li>
                  <li onClick={logout}>로그아웃</li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="login-btn" onClick={login}>
            로그인
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
