import React, { useState } from 'react';
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';
import { HiArrowRight } from "react-icons/hi";
import './BookmarkSlider.css';

interface BookmarkSliderProps {
  bookmarks: Bookmark[];
}

const BookmarkSlider: React.FC<BookmarkSliderProps> = ({ bookmarks }) => {
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);

  const handleViewDetails = (bookmark: Bookmark) => {
    setSelectedBookmark(bookmark);
  };

  const closeModal = () => {
    setSelectedBookmark(null);
  };

  return (
    <div className="mypage-bookmark-slider">
      {bookmarks.map((bookmark) => (
        <div key={bookmark.bookmarkId} className="mypage-bookmark-card">
          <div className="mypage-bookmark-card-header">
            <span>{bookmark.questionCount}개 질문</span>
            {bookmark.accessLevel === 'PRIVATE' && <IoLockClosed size={14} />}
            {bookmark.accessLevel === 'PUBLIC' && <IoLockOpen size={14} />}
          </div>
          <div className="mypage-bookmark-card-title">{bookmark.name}</div>
          <button
            className="mypage-bookmark-card-detail-btn"
            onClick={() => handleViewDetails(bookmark)}
          >
            자세히 <HiArrowRight size={16} />
          </button>
        </div>
      ))}
      {selectedBookmark && (
        <div className="mypage-bookmark-modal">
          <h2>{selectedBookmark.name}</h2>
          <p>{selectedBookmark.description || '설명 없음'}</p>
          <p>질문 수: {selectedBookmark.questionCount}</p>
          <button onClick={closeModal}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default BookmarkSlider;