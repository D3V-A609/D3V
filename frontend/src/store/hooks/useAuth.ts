// // useAuth.ts
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginSuccess, setLoading, setError, logout } from '../slices/authSlice';
// import TokenService from '../services/token/tokenService';
// import SecureStorage from '../services/token/SecureStorage';

// interface TokenResponse {
//   AccessToken: string;
//   user: {
//     memberId: number;
//     nickname: string;
//     email: string;
//     profileImg: string;
//   };
// }

// const useAuth = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const checkRefreshToken = async () => {
//       try {
//         dispatch(setLoading(true));
        
//         const response = await fetch('https://d3v.asia/api/member/token', {
//           method: 'POST',
//           credentials: 'include',
//         });

//         if (response.ok) {
//           try {
//             const tokenData: TokenResponse = await response.json();
//             console.log(tokenData);
            
//             if (tokenData) {
//               TokenService.setAccessToken(tokenData.AccessToken);
//               SecureStorage.updateAuthStatus(true); // 인증 상태 업데이트
              
//               dispatch(
//                 loginSuccess({
//                   isAuthenticated: true,
//                   user: tokenData.user
//                 })
//               );
//             } else {
//               console.log('비어 있는 응답');
//               dispatch(logout());
//               TokenService.removeAccessToken(); // accessToken 제거
//               SecureStorage.updateAuthStatus(false); // 인증 상태 초기화
//             }
//           } catch (error) {
//             console.error('JSON 파싱 에러:', error);
//             dispatch(setError('토큰 파싱에 실패했습니다.'));
//             dispatch(logout());
//             TokenService.removeAccessToken(); // accessToken 제거
//             SecureStorage.updateAuthStatus(false); // 인증 상태 초기화
//           }
//         } else {
//           console.log('비정상적인 응답 상태 코드:', response.status);
//           dispatch(logout());
//           TokenService.removeAccessToken(); // accessToken 제거
//           SecureStorage.updateAuthStatus(false); // 인증 상태 초기화
//         }
//       } catch (error) {
//         dispatch(setError('토큰 갱신에 실패했습니다.'));
//         dispatch(logout());
//         TokenService.removeAccessToken(); // accessToken 제거
//         SecureStorage.updateAuthStatus(false); // 인증 상태 초기화
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };


//     checkRefreshToken();
//   }, [dispatch]);
// };

// export default useAuth;
