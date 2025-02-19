import React, { useState } from 'react';
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';
import { HiArrowRight } from "react-icons/hi";
import './BookmarkSlider.css';
import BookmarkDetailModal from '../Bookmark/BookmarkDetailModal';

interface BookmarkSliderProps {
  bookmarks: Bookmark[];
}

const BookmarkSlider: React.FC<BookmarkSliderProps> = ({ bookmarks }) => {
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);

  const handleViewDetails = (bookmark: Bookmark) => {
    console.log("Selected bookmark:", bookmark);
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
        <BookmarkDetailModal
          bookmarkId={selectedBookmark.bookmarkId}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default BookmarkSlider;