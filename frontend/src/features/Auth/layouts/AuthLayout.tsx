import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import logoImg from '../../../assets/images/logo.gif';
import loginImg from '../../../assets/images/login-illust.svg'
import './AuthLayout.css';

const AuthLayout: React.FC = () => {
  const location = useLocation();

  const getIllustration = () => {
    // pathname을 체크하여 적절한 이미지 반환
    switch (location.pathname) {
      case '/auth/login':
        return loginImg;
      // case '/auth/signup':
      //   return signupImg;
      default:
        return loginImg;
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="logo">
          <img src={logoImg} alt="Logo" />
        </div>
        <div className="auth-illustration">
          <img src={getIllustration()} alt="Auth illustration" />
        </div>
      </div>
      <div className="auth-right">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;