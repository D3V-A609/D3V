import React from "react";
import "./Nav.css";
import NavProfile from "./NavProfile.tsx";
import NavList from "./NavList.tsx";
import NavFire from "./NavFire.tsx";

// Props 타입 정의
interface NavProps {
  isNavOpen: boolean;
}

const profileProps = {
  profileImage:"", 
  nickname:"혜옹",
  job:'Front-End', 
  onLogout:()=>{},
}

const Nav: React.FC<NavProps> = ({ isNavOpen }) => {

  return (
    <div className={`navbar ${isNavOpen ? "navbar--open" : ""}`}>
      <NavFire nickname="혜옹" continuousDays={3}  isNavOpen={isNavOpen}/>
      <NavProfile profile={profileProps} isNavOpen={isNavOpen} /> 
      <NavList isNavOpen={isNavOpen} />
    </div>
  );
};

export default Nav;
