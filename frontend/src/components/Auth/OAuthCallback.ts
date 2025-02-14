// components/Auth/OAuthCallback.tsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TokenService from '../../store/services/token/tokenService';
import { loginSuccess } from '../../store/slices/authSlice';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = () => {
      const searchParams = new URLSearchParams(location.search);
      const accessToken = searchParams.get('accessToken');

      if (accessToken) {
        // 토큰 저장
        TokenService.setAccessToken(accessToken);

        // Redux 상태 업데이트
        dispatch(loginSuccess({ isAuthenticated: true }));
        
        // 메인 페이지로 리다이렉트
        navigate('/', { replace: true });
      } else {
        // 토큰이 없으면 로그인 페이지로
        navigate('/auth/login', { replace: true });
      }
    };

    handleCallback();
  }, [navigate, location, dispatch]);

  return null;
};

export default OAuthCallback;
