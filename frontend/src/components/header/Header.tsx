import React, { useEffect, useState } from "react"; // useEffect 제거
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';
import { RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";

import "./Header.css";
import Logo from "../../assets/images/logo.gif";
import Nav from "./Nav";
import UserProfileImg from "./UserProfileImg";

const Header: React.FC = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  // Local state
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  // 외부 클릭 시 userInfo 모달창 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserInfoOpen) {
        const userInfoModal = document.querySelector(".user-info-dropdown"); // 모달 요소 찾기
        if (userInfoModal && userInfoModal.contains(event.target as Node)) {
          return; // ✅ 내부 클릭이면 아무 동작 안 함
        }
        setIsUserInfoOpen(false); // ✅ 외부 클릭 시 닫기
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserInfoOpen]);
  

  // Navigation handlers
  const handleLogoClick = () => navigate("/");
  const goToLogin = () => navigate('/auth/login');
  const goMyPage = () => {
    navigate('/my');
    setIsUserInfoOpen(false);
  };

  // Toggle handlers
  const toggleUserInfo = () => setIsUserInfoOpen(!isUserInfoOpen);
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const navToggleClose = () => {
    if (isNavOpen) setIsNavOpen(false);
  };

  // Auth handlers
  const handleLogout = () => {
    dispatch(logout());
    setIsUserInfoOpen(false);
    navigate("/");
    
    toast.success('로그아웃되었습니다.', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true, // 토스트 메시지를 클릭하면 즉시 닫힘
      pauseOnHover: false, // 마우스를 토스트 위에 올려도 자동 닫힘 타이머가 계속 실행됨
      toastId: 'logout-success'
    });
  };

  // Render user profile section
  const renderUserProfile = () => (
    isAuthenticated ? (
      <>
        <div onClick={toggleUserInfo}>
          <UserProfileImg />
        </div>
        {isUserInfoOpen && (
          <div className="user-info-dropdown">
            <ul>
              <li onClick={goMyPage}>마이 페이지</li>
              <li onClick={handleLogout}>로그아웃</li>
            </ul>
          </div>
        )}
      </>
    ) : (
      <div className="login-btn" onClick={goToLogin}>
        로그인
      </div>
    )
  );

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
        {renderUserProfile()}
      </div>
    </header>
  );
};

export default Header;
