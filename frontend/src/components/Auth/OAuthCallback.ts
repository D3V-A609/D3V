import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'; // toast import 추가
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
        
        // 로그인 성공 토스트 표시
        toast.success('로그인되었습니다.', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true, // 토스트 메시지를 클릭하면 즉시 닫힘
          pauseOnHover: false, // 마우스를 토스트 위에 올려도 자동 닫힘 타이머가 계속 실행됨
          toastId: 'login-success'
        });

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
