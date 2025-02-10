import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Header from './components/header/Header';

import HomePage from './pages/HomePage.tsx';
import AllQuestionPage from './pages/AllQuestionPage.tsx';
import BoardPage from './pages/BoardPage.tsx';
import AIPage from './pages/AIPage.tsx';
import MyPage from './pages/MyPage.tsx';
import VideoPage from './pages/VideoPage.tsx';
import QuestionDetailPage from './pages/QuestionDetailPage.tsx';

import './App.css';
import './styles/TestStyle.css'
import { RecordingProvider } from './context/RecordingContext.tsx';
import { TimerProvider } from './context/TimerContext.tsx';

function App() {

  // 레이아웃 라우트 정의
  const router = createBrowserRouter([
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
        { path: '/AllQuestionPage', element: <AllQuestionPage /> },
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
