// // src/components/Auth/KakaoCallback.tsx
// import { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import tokenWorkerService from '../../store/services/token/tokenWorkerService';
// import { loginSuccess } from '../../store/slices/authSlice';

// const KakaoCallback = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const handleCallback = async () => {
//       const params = new URLSearchParams(location.search);
//       const accessToken = params.get('accessToken');

//       if (accessToken) {
//         try {
//           await tokenWorkerService.setToken(accessToken);
//           dispatch(loginSuccess({ isAuthenticated: true }));
//           navigate('/');
//         } catch (error) {
//           console.error('토큰 저장 실패:', error);
//           navigate('/auth/login');
//         }
//       } else {
//         navigate('/auth/login');
//       }
//     };

//     handleCallback();
//   }, [navigate, location, dispatch]);

//   return null;
// };

// export default KakaoCallback;
