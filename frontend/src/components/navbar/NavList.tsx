import React from "react";
import { Link, useLocation } from "react-router-dom";

import home_icon from '../../assets/images/navbar/icons/home-icon1.png';
import cs_icon from '../../assets/images/navbar/icons/cs-icon1.png';
import mypage_icon from '../../assets/images/navbar/icons/mypage-icon1.png';
import aipage_icon from '../../assets/images/navbar/icons/aipage-icon1.png';
import board_icon from '../../assets/images/navbar/icons/boardpage-icon1.png';
import youtubepage_icon from '../../assets/images/navbar/icons/youtubepage-icon1.png';

interface NavListProps {
    isNavOpen: boolean;
}

const NavList: React.FC<NavListProps> = ({ isNavOpen }) => {
    const location = useLocation(); // 현재 경로 가져오기

    const links = [
        { to: '/', icon: home_icon, label: 'Home' },
        { to: '/all_question', icon: cs_icon, label: 'CS 질문 모음' },
        { to: '/ai', icon: aipage_icon, label: 'AI 면접 연습' },
        { to: '/board', icon: board_icon, label: '자유게시판' },
        { to: '/video', icon: youtubepage_icon, label: '면접 영상 추천' },
        { to: '/my', icon: mypage_icon, label: '마이 페이지' },
    ];

    return (
        <>
            {links.map(link => (
                <Link
                    key={link.to}
                    to={link.to}
                    className={`navbar-position ${location.pathname === link.to ? 'active-link' : ''}`}
                    style={{ textDecoration: "none"}}
                >
                    <img className='nav-icon' src={link.icon} />
                    {isNavOpen && <span>{link.label}</span>}
                </Link>
            ))}
        </>
    );
};

export default NavList;
