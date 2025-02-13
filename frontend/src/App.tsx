import { Outlet, RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Header from './components/header/Header';

import HomePage from './pages/HomePage.tsx';
import AllQuestionPage from './pages/AllQuestionPage.tsx';
import BoardPage from './pages/BoardPage.tsx';
import AIPage from './pages/AIPage.tsx';
import MyPage from './pages/MyPage.tsx';
import VideoPage from './pages/VideoPage.tsx';
import QuestionDetailPage from './pages/QuestionDetailPage.tsx';
import AuthLayout from './features/Auth/layouts/AuthLayout.tsx';
import SignupLayout from './features/Auth/layouts/SignupLayout.tsx';
import LoginPage from './pages/Auth/Login.tsx';
import ForgotPasswordPage from './pages/Auth/ForgotPassword.tsx';
import Step1 from './pages/Auth/SignupSteps/Step1.tsx';
import Step2 from './pages/Auth/SignupSteps/step2.tsx';
import Step3 from './pages/Auth/SignupSteps/step3.tsx';

import './App.css';
import './styles/TextStyle.css';

import { RecordingProvider } from './context/RecordingContext.tsx';
import { TimerProvider } from './context/TimerContext.tsx';

function App() {

  // 레이아웃 라우트 정의
  const router = createBrowserRouter([
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
        { path: '/all-questions', element: <AllQuestionPage /> },
        { path: '/ai', element: <AIPage /> },
        { path: '/my', element: <MyPage /> },
        { path: '/board', element: <BoardPage /> },
        { path: '/video', element: <VideoPage /> },
        { path: '/question', element: 
          <RecordingProvider>
            <TimerProvider>
            <QuestionDetailPage />
            </TimerProvider>
          </RecordingProvider>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
