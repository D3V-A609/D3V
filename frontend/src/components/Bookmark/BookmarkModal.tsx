import React, { useState, useEffect, useCallback } from 'react';
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../store/hooks/useRedux';
import { fetchBookmarks, addQuestionsToBookmarks, fetchAllBookmarks, createBookmark } from '../../store/actions/bookmarkActions';
import { fetchUserInfo } from '../../store/actions/userActions';
import './BookmarkModal.css';
import AddBookmarkModal from './AddBookmarkModal';

interface BookmarkModalProps {
  questionIds: number[];
  onClose: () => void;
}

const BookmarkModal: React.FC<BookmarkModalProps> = ({ questionIds, onClose }) => {
  const dispatch = useAppDispatch();
  const { bookmarks, selectedBookmarks } = useAppSelector(state => state.bookmarks);
  const [localSelectedBookmarks, setLocalSelectedBookmarks] = useState<number[]>([]);
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false);
  const [memberId, setMemberId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUserInfo(null))
      .unwrap()
      .then((userInfo) => {
        if ('memberId' in userInfo) {
          setMemberId(userInfo.memberId);
        }
      })
      .catch((error) => console.error('Failed to fetch user info:', error));
  }, [dispatch]);

  const fetchBookmarksData = useCallback(async () => {
    if (memberId !== null) {
      if (questionIds.length === 1) {
        await dispatch(fetchBookmarks(questionIds[0]));
      } else {
        await dispatch(fetchAllBookmarks(memberId));
      }
    }
  }, [dispatch, questionIds, memberId]);

  useEffect(() => {
    if (memberId !== null) {
      fetchBookmarksData();
    }
  }, [fetchBookmarksData, memberId]);

  useEffect(() => {
    if (questionIds.length === 1) {
      setLocalSelectedBookmarks(selectedBookmarks);
    } else {
      setLocalSelectedBookmarks([]);
    }
  }, [questionIds, selectedBookmarks]);

  const handleCheckboxChange = (bookmarkId: number) => {
    setLocalSelectedBookmarks(prev =>
      prev.includes(bookmarkId)
        ? prev.filter(id => id !== bookmarkId)
        : [...prev, bookmarkId]
    );
  };

  const handleSave = async () => {
    try {
      await dispatch(addQuestionsToBookmarks({ bookmarkIds: localSelectedBookmarks, questionIds })).unwrap();
      alert('북마크에 질문이 추가되었습니다.');
      onClose();
    } catch (error) {
      console.error('북마크 추가 실패:', error);
      alert('북마크에 질문을 추가하는데 실패했습니다.');
    }
  };

  const handleAddBookmark = async (title: string, description: string, accessLevel: string) => {
    try {
      await dispatch(createBookmark({ name: title, description, accessLevel: accessLevel as 'PUBLIC' | 'PRIVATE' | 'PROTECTED' })).unwrap();
      fetchBookmarksData();
      setIsAddBookmarkOpen(false);
    } catch (error) {
      console.error('북마크 생성 실패:', error);
      alert('새 북마크 생성에 실패했습니다.');
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="bookmark-modal">
          <div className="bookmark-header">
            <h2>북마크</h2>
            <button className="bookmark-close-btn" onClick={onClose}>×</button>
          </div>
          <div className="bookmark-content">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.bookmarkId} className="bookmark-item">
                <input
                  type="checkbox"
                  checked={localSelectedBookmarks.includes(bookmark.bookmarkId)}
                  onChange={() => handleCheckboxChange(bookmark.bookmarkId)}
                />
                <span>{bookmark.name}</span>
                <span className="bookmark-lock-icon">
                  {bookmark.accessLevel === 'PRIVATE' && <IoLockClosed size={18} />}
                  {bookmark.accessLevel === 'PUBLIC' && <IoLockOpen size={18} />}
                  {bookmark.accessLevel === 'PROTECTED' && <IoLockClosed size={18} style={{ opacity: 0.5 }} />}
                </span>
              </div>
            ))}
          </div>
          <button className="add-bookmark-btn" onClick={() => setIsAddBookmarkOpen(true)}>
            + 새 북마크 추가
          </button>
          <button className="save-bookmark-btn" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
      {isAddBookmarkOpen && (
        <AddBookmarkModal
          onClose={() => setIsAddBookmarkOpen(false)}
          onSave={handleAddBookmark}
        />
      )}
    </>
  );
};

export default BookmarkModal;