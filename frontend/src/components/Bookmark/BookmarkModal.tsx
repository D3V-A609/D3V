import React, { useState, useEffect, useCallback } from 'react';
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';
import bookmarkApi from '../../store/services/bookmarkApi';
import './BookmarkModal.css';
import AddBookmarkModal from './AddBookmarkModal';

interface BookmarkModalProps {
  questionId: number; // 질문 ID
  onClose: () => void; // 모달 닫기 함수
}

const BookmarkModal: React.FC<BookmarkModalProps> = ({ questionId, onClose }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedBookmarks, setSelectedBookmarks] = useState<number[]>([]);
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false);

  // API 호출로 북마크 데이터 가져오기
  const fetchBookmarks = useCallback(async () => {
    try {
      const response = await bookmarkApi.getBookmarks(questionId);
      setBookmarks(response.bookmarks);
    } catch (error) {
      console.error('북마크 데이터를 불러오는데 실패했습니다:', error);
    }
  }, [questionId]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  // 체크박스 변경 핸들러
  const handleCheckboxChange = async (bookmarkId: number) => {
    try {
      const isSelected = selectedBookmarks.includes(bookmarkId);

      if (isSelected) {
        await bookmarkApi.toggleBookmark(bookmarkId, questionId); // API 호출로 북마크 제거
        setSelectedBookmarks((prev) =>
          prev.filter((id) => id !== bookmarkId)
        );
      } else {
        await bookmarkApi.toggleBookmark(bookmarkId, questionId); // API 호출로 북마크 추가
        setSelectedBookmarks((prev) => [...prev, bookmarkId]);
      }
    } catch (error) {
      console.error('북마크 업데이트 실패:', error);
    }
  };

  // 북마크에 질문 추가하기
  const handleAddQuestionsToBookmarks = async () => {
    try {
      for (const bookmarkId of selectedBookmarks) {
        await bookmarkApi.addQuestionToBookmark(bookmarkId, [questionId]); // API 호출로 질문 추가
      }
      alert('저장되었습니다.');
    } catch (error) {
      console.error('질문 추가 실패:', error);
      alert('질문을 북마크에 추가하는 데 실패했습니다.');
    }
    onClose(); // 모달 닫기
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="bookmark-modal">
          {/* 모달 헤더 */}
          <div className="bookmark-header">
            <h2>북마크</h2>
            <button className="bookmark-close-btn" onClick={handleAddQuestionsToBookmarks}>
              ×
            </button>
          </div>

          {/* 북마크 리스트 */}
          <div className="bookmark-content">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.bookmarkId} className="bookmark-item">
                <input
                  type="checkbox"
                  checked={selectedBookmarks.includes(bookmark.bookmarkId)}
                  onChange={() => handleCheckboxChange(bookmark.bookmarkId)}
                />
                <span>{bookmark.name}</span>

                {/* 공개 범위 아이콘 */}
                <span className="bookmark-lock-icon">
                  {bookmark.accessLevel === 'PRIVATE' && (
                    <IoLockClosed size={18} />
                  )}
                  {bookmark.accessLevel === 'PUBLIC' && (
                    <IoLockOpen size={18} />
                  )}
                  {bookmark.accessLevel === 'PROTECTED' && (
                    <IoLockClosed size={18} style={{ opacity: 0.5 }} />
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* 새 북마크 추가 버튼 */}
          <button
            className="add-bookmark-btn"
            onClick={() => setIsAddBookmarkOpen(true)} // 새 북마크 모달 열기
          >
            + 새 북마크 추가
          </button>
        </div>
      </div>

      {/* AddBookmarkModal 렌더링 */}
      {isAddBookmarkOpen && (
        <AddBookmarkModal
          onClose={() => setIsAddBookmarkOpen(false)} // 닫기 핸들러
          onSave={async (name, description, accessLevel) => {
            try {
              await bookmarkApi.createBookmark({ name, description, accessLevel });
              fetchBookmarks(); // 새 북마크 생성 후 리스트 업데이트
              setIsAddBookmarkOpen(false); // 모달 닫기
            } catch (error) {
              console.error('북마크 생성 실패:', error);
              alert('새 북마크 생성에 실패했습니다.');
            }
          }}
        />
      )}
    </>
  );
};

export default BookmarkModal;