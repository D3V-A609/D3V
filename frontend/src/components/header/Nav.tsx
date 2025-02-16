import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

interface NavProps {
    toggleClose: () => void;
}
const Nav: React.FC<NavProps> = ({toggleClose}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const links = [
        { to: '/', label: 'Home' },
        { to: '/all-questions', label: '면접 질문 모음' },
        { to: '/video', label: '면접 영상 추천' },
        { to: '/board', label: '자유게시판' },
    ];

    const handleClick = (to: string) => {
        if (to === '/AllQuestionPage' && location.pathname === to) {
            // 현재 경로가 AllQuestionPage이고 다시 클릭했을 때
            navigate(to, { replace: true });
            window.location.reload();
        }
        toggleClose();
    };

    return (
        <nav className="header-container_nav-section">
            <ul>
                {links.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`navbar-item ${location.pathname === item.to ? 'active-link' : ''}`}
                        onClick={() => handleClick(item.to)}
                    >
                        <span>{item.label}</span>
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
