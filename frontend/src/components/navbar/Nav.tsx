import React from "react";
import "./Nav.css";
import NavProfile from "./NavProfile.tsx";
import NavList from "./NavList.tsx";

// Props 타입 정의
interface NavProps {
  isNavOpen: boolean;
}

const Nav: React.FC<NavProps> = ({ isNavOpen }) => {
  return (
    <div className={`navbar ${isNavOpen ? "navbar--open" : ""}`}>
        <NavProfile profileImage="" nickname="혜옹" job='Front-End' onLogout={()=>{}} /> 
        <NavList />
    </div>
  );
};

export default Nav;
