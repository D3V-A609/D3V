import React from 'react';
import './SocialLogin.css'
import kakaoIcon from '../../assets/images/social/kakao-icon.png'
import naverIcon from '../../assets/images/social/naver-icon.png'
import googleIcon from '../../assets/images/social/google-icon.svg'

const SocialLogin: React.FC = () => {  
  const handleGoogleLogin = () => {
    // 구글 로그인 로직
  };
  
  const handleKakaoLogin = () => {
    // 카카오 로그인 로직
  };

  const handleNaverLogin = () => {
    // 네이버 로그인 로직
  };

  return (
    <div className="social-login">
      <p className="social-title">SNS 로그인</p>
      <div className="social-buttons">
        <div className="social-button-wrapper">
          <button onClick={handleNaverLogin} className="social-button naver">
            <img src={naverIcon} alt="naver" />
          </button>
          <span className="social-label">네이버</span>
        </div>
        <div className="social-button-wrapper">
          <button onClick={handleKakaoLogin} className="social-button kakao">
            <img src={kakaoIcon} alt="kakao" />
          </button>
          <span className="social-label">카카오</span>
        </div>
        <div className="social-button-wrapper">
          <button onClick={handleGoogleLogin} className="social-button google">
            <img src={googleIcon} alt="google" />
          </button>
          <span className="social-label">구글</span>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
