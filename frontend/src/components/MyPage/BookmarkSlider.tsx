// BookmarkSlider.tsx
import React from 'react';
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';
import { HiArrowRight } from "react-icons/hi";
import './BookmarkSlider.css';

interface BookmarkSliderProps {
  bookmarks: Bookmark[];
  onViewDetails: (bookmarkId: number) => void;
}

const BookmarkSlider: React.FC<BookmarkSliderProps> = ({ bookmarks, onViewDetails }) => {
  return (
    <div className="mypage-bookmark-slider">
      {bookmarks.map((bookmark) => (
        <div key={bookmark.bookmarkId} className="mypage-bookmark-card">
          <div className="mypage-bookmark-card-header">
            <span>{bookmark.questionCount}개 질문</span>
            {bookmark.accessLevel === 'PRIVATE' && <IoLockClosed size={14} />}
            {bookmark.accessLevel === 'PUBLIC' && <IoLockOpen size={14} />}
            {bookmark.accessLevel === 'PROTECTED' && (
              <IoLockClosed size={14} style={{ opacity: 0.5 }} />
            )}
          </div>
          <div className="mypage-bookmark-card-title">{bookmark.name}</div>
          <button
            className="mypage-bookmark-card-detail-btn"
            // onClick={() => onViewDetails(bookmark.bookmarkId)}
            onClick={() => onViewDetails(bookmark.bookmarkId)}
          >
            자세히 <HiArrowRight size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookmarkSlider;