// React & Hooks
import { useEffect } from 'react';

// React & Redux
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { RootState } from './store';

// React Router
import { Outlet, RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

// Components
import Header from './components/header/Header';
import OAuthCallback from './components/Auth/OAuthCallback.ts';

// Pages
import HomePage from './pages/HomePage.tsx';
import AllQuestionPage from './pages/AllQuestionPage.tsx';
import BoardPage from './pages/BoardPage.tsx';
// import AIPage from './pages/AIPage.tsx';
import VideoPage from './pages/VideoPage.tsx';
import MyPage from './pages/MyPage.tsx';
import QuestionDetailPage from './pages/QuestionDetailPage.tsx';

// Auth Pages
import AuthLayout from './features/Auth/layouts/AuthLayout.tsx';
import SignupLayout from './features/Auth/layouts/SignupLayout.tsx';
import LoginPage from './pages/Auth/Login.tsx';
import ForgotPasswordPage from './pages/Auth/ForgotPassword.tsx';
import Step1 from './pages/Auth/SignupSteps/Step1.tsx';
import Step2 from './pages/Auth/SignupSteps/Step2.tsx';
import Step3 from './pages/Auth/SignupSteps/Step3.tsx';
import ProtectedSignupRoute from './components/Auth/ProtectedSignupRoute.tsx';

// Context Providers
import { RecordingProvider } from './context/RecordingContext.tsx';
import { TimerProvider } from './context/TimerContext.tsx';

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styles
import './App.css';
import './styles/TextStyle.css';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning('로그인이 필요한 서비스입니다.', {
        position: "top-right", // 토스트 메시지가 표시될 위치 (top-right: 우측 상단)
        autoClose: 1500, // 자동으로 닫히는 시간 (1500ms = 1.5초)
        hideProgressBar: true, // false: 토스트가 닫히기까지 남은 시간을 보여주는 프로그레스 바 표시
        closeOnClick: true, // 토스트 메시지를 클릭하면 즉시 닫힘
        pauseOnHover: false, // 마우스를 토스트 위에 올리면 자동 닫힘 타이머 일시 중지
        draggable: true, // 사용자가 토스트를 드래그하여 닫을 수 있음
        toastId: 'login-required' // 토스트의 고유 ID (동일 ID의 토스트가 이미 표시 중이면 중복 표시되지 않음)
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};


function App() {
  const router = createBrowserRouter([
    {
      path: '/oauth/redirect',
      element: <OAuthCallback />
    },
    {
      path: '/auth',
      children: [
        { path: '', element: <Navigate to="/auth/login" replace /> },
        {
          path: '',
          element: <AuthLayout />,
          children: [
            { path: 'login', element: <LoginPage /> },
            {
              path: 'signup',
              element: <SignupLayout />,
              children: [
                { 
                  path: '', 
                  element: <ProtectedSignupRoute step={1}><Step1 /></ProtectedSignupRoute> 
                },
                { 
                  path: 'profile', 
                  element: <ProtectedSignupRoute step={2}><Step2 /></ProtectedSignupRoute> 
                },
                { 
                  path: 'complete', 
                  element: <ProtectedSignupRoute step={3}><Step3 /></ProtectedSignupRoute> 
                }
              ]
            }
          ]
        },
        { path: 'forgot-password', element: <ForgotPasswordPage /> }
      ]
    },
    {
      path: '/',
      element: (
        <div className="App">
          <Header />
          <div className="main-page">
            <Outlet />
          </div>
        </div>
      ),
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/all-questions', element: <ProtectedRoute><AllQuestionPage /></ProtectedRoute> },
        { path: '/video', element: <VideoPage /> },
        { 
          path: '/my', 
          element: <ProtectedRoute><MyPage /></ProtectedRoute> 
        },
        { path: '/board', element: <BoardPage /> },
        { 
          path: '/question', 
          element: (
            <ProtectedRoute>
              <RecordingProvider>
                <TimerProvider>
                  <QuestionDetailPage />
                </TimerProvider>
              </RecordingProvider>
            </ProtectedRoute>
          )
        }
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer 
          limit={1}  // 동시에 표시될 토스트 개수 제한
          pauseOnFocusLoss={false}  // 포커스 잃을 때 일시정지 비활성화
        />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
