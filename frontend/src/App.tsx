import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Header from './components/header/Header.tsx';

import HomePage from './pages/HomePage.tsx';
import CSPage from './pages/CSPage.tsx';
import BoardPage from './pages/BoardPage.tsx';
import AIPage from './pages/AIPage.tsx';
import MyPage from './pages/MyPage.tsx';
import VideoPage from './pages/VideoPage.tsx';

import './App.css';
import './styles/TestStyle.css'

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
        { path: '/cs', element: <CSPage /> },
        { path: '/ai', element: <AIPage /> },
        { path: '/my', element: <MyPage /> },
        { path: '/board', element: <BoardPage /> },
        { path: '/video', element: <VideoPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
