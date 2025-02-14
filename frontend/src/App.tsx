import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { useSelector } from 'react-redux';
import { RootState } from './store';

import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet, RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Header from './components/header/Header';

import HomePage from './pages/HomePage.tsx';
import AllQuestionPage from './pages/AllQuestionPage.tsx';
import BoardPage from './pages/BoardPage.tsx';
import AIPage from './pages/AIPage.tsx';
import MyPage from './pages/MyPage.tsx';
import QuestionDetailPage from './pages/QuestionDetailPage.tsx';
import AuthLayout from './features/Auth/layouts/AuthLayout.tsx';
import SignupLayout from './features/Auth/layouts/SignupLayout.tsx';
import LoginPage from './pages/Auth/Login.tsx';
import OAuthCallback from './components/Auth/OAuthCallback.ts';
import ForgotPasswordPage from './pages/Auth/ForgotPassword.tsx';
import Step1 from './pages/Auth/SignupSteps/Step1.tsx';
import Step2 from './pages/Auth/SignupSteps/Step2.tsx';
import Step3 from './pages/Auth/SignupSteps/Step3.tsx';

import './App.css';
import './styles/TextStyle.css';

import { RecordingProvider } from './context/RecordingContext.tsx';
import { TimerProvider } from './context/TimerContext.tsx';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning('로그인이 필요한 서비스입니다.', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'login-required' // 고유 ID 추가
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
                { path: '', element: <Step1 /> },
                { path: 'profile', element: <Step2 /> },
                { path: 'complete', element: <Step3 /> }
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
        { path: '/ai', element: <AIPage /> },
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
