import { useState } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Nav from './components/navbar/Nav.tsx';
import Header from './components/header/Header.tsx';

import HomePage from './pages/HomePage.tsx';
import CSPage from './pages/CSPage.tsx';
import BoardPage from './pages/BoardPage.tsx';
import AIPage from './pages/AIPage.tsx';
import MyPage from './pages/MyPage.tsx';
import VideoPage from './pages/VideoPage.tsx';

import './App.css';

function App() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true); // nav bar를 오픈헀는지 여부를 관리하는 useState()
  const handleNavOpen = () => {
    setIsNavOpen((prev) => !prev); // nav bar를 open/close 하는 함수
  };

  // 레이아웃 라우트 정의
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div className="App">
          <Header handleNavOpen={handleNavOpen} />
          <div className="main-page">
            <Nav isNavOpen={isNavOpen} />
            <div className={`child-page ${!isNavOpen ? 'child-page--close' : ''}`}>
              <Outlet />
            </div>
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
