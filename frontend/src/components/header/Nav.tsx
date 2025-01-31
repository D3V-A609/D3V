import React from "react";
import { useLocation, Link } from "react-router-dom";

const Nav: React.FC = () => {
    const location = useLocation(); // 현재 경로 가져오기

    const links = [
        { to: '/', label: 'Home' },
        { to: '/cs', label: 'CS 질문 모음' },
        { to: '/ai', label: 'AI 면접 연습' },
        { to: '/board', label: '자유게시판' },
        { to: '/video', label: '면접 영상 추천' },
        { to: '/my', label: '마이 페이지' },
    ];

  return (
    <nav className="header-container_nav-section">
      <ul>
        {
            links.map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    className={`navbar-item ${location.pathname === item.to ? 'active-link' : ''}`}
                >
                    <span>{item.label}</span>
                </Link>
             ))
        }
      </ul>
    </nav>
  );
};

export default Nav;
