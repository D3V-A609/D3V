import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux"; // UseSelector -> useSelector로 수정
import { toast } from 'react-toastify'; // toast import 추가
import { RootState } from "../../store"; // RootState import 추가

import "./Header.css";
import Logo from "../../assets/images/logo.gif";
import Nav from "./Nav";
import UserProfileImg from "./UserProfileImg";

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  
  // isLogined state 제거하고 Redux의 isAuthenticated 사용
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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
    // Redux logout action 추가 필요
    setIsUserInfoOpen(false);
    navigate("/");
  };

  const goMyPage = () => {
    navigate('/my');
    setIsUserInfoOpen(false);
  }

  const goToLogin = () => {
    navigate('/auth/login');
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('로그인되었습니다.', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        toastId: 'login-success' // 고유 ID 추가
      });
    }
  }, [isAuthenticated]);

  return (
    <header className="header-container">
      <div className="header-container_logo-div">
        <div className="hamburger-menu" onClick={toggleNav}>
          {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        <img
          src={Logo}
          className="header-container_logo-svg"
          onClick={handleLogoClick}
          alt="Logo"
        />
      </div>

      <nav className={`header-container_nav-section ${isNavOpen ? "active" : ""}`}>
        <Nav toggleClose={navToggleClose} />
      </nav>

      <div className="header-user-profile">
        {isAuthenticated ? (
          <>
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
          <div className="login-btn" onClick={goToLogin}>
            로그인
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
