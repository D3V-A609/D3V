// Pages/BoardPage.tsx
import React from 'react';
import PageHeader from '../components/PageHeader/PageHeader';
import { BsChatSquareText } from 'react-icons/bs';
import './BoardPage.css';

const BoardPage: React.FC = () => {

  return (
    <div className="board-page">
      <section className="board-section">
        <PageHeader 
          title="자유 게시판"
          description="다양한 의견과 글을 자유롭게 게시하고 공유해주세요!"
          icon={<BsChatSquareText />}
          iconStyle="pink-chat-icon"
        />
      </section>
    </div>
  );
};

export default BoardPage;
