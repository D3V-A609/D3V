import './App.css';
import Nav from './components/navbar/Nav.tsx';
import Header from './components/header/Header.tsx';
import { useState } from 'react';

function App() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true); // nav bar를 오픈헀는지 여부를 관리하는 useState()
  const handleNavOpen = () => {
    setIsNavOpen((prev) => !prev); // nav bar를 open/close 하는 함수
  };

  return (
    <div className="App">
      <Header handleNavOpen={handleNavOpen} />
      <div className="main-page">
        <Nav isNavOpen={isNavOpen} />
        <div className="child-page"></div>
      </div>
    </div>
  );
}

export default App;
