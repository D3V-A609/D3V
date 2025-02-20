import React, { useState, useEffect } from 'react';
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../store/hooks/useRedux';
import {
  fetchBookmarks,
  addQuestionsToBookmarks,
  fetchAllBookmarks,
  createBookmark,
  updateSingleQuestionBookmarks,
} from '../../store/actions/bookmarkActions';
import { fetchUserInfo } from '../../store/actions/userActions';
import './BookmarkModal.css';
import AddBookmarkModal from './AddBookmarkModal';
import SecureStorage from '../../store/services/token/SecureStorage';

interface BookmarkModalProps {
  questionIds: number[];
  onClose: () => void;
}

const BookmarkModal: React.FC<BookmarkModalProps> = ({ questionIds, onClose }) => {
  const dispatch = useAppDispatch();
  const { bookmarks, selectedBookmarks } = useAppSelector((state) => state.bookmarks);
  const [localSelectedBookmarks, setLocalSelectedBookmarks] = useState<number[]>([]);
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false);
  const [memberId, setMemberId] = useState<number | null>(null);

  const currMemberId = SecureStorage.getMemberId();

  // 사용자 정보 및 북마크 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(currMemberId !== null && currMemberId !== 0){
          const userInfo = await dispatch(fetchUserInfo(currMemberId)).unwrap();
          if ('memberId' in userInfo) {
            setMemberId(userInfo.memberId);
            if (questionIds.length === 1) {
              await dispatch(fetchBookmarks(questionIds[0]));
            } else {
              await dispatch(fetchAllBookmarks(userInfo.memberId));
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
    fetchData();
  }, [dispatch, questionIds, currMemberId]);

  // selectedBookmarks 변경 시 localSelectedBookmarks 동기화
  useEffect(() => {
    if (questionIds.length === 1) {
      setLocalSelectedBookmarks(selectedBookmarks);
    } else {
      setLocalSelectedBookmarks([]);
    }
  }, [selectedBookmarks, questionIds]);

  // 체크박스 상태 변경
  const handleCheckboxChange = (bookmarkId: number) => {
    setLocalSelectedBookmarks((prev) =>
      prev.includes(bookmarkId)
        ? prev.filter((id) => id !== bookmarkId)
        : [...prev, bookmarkId]
    );
  };

  // 북마크 저장
  const handleSave = async () => {
    try {
      if (questionIds.length === 1) {
        await dispatch(
          updateSingleQuestionBookmarks({
            questionId: questionIds[0],
            bookmarkIds: localSelectedBookmarks,
          })
        ).unwrap();
      } else if (localSelectedBookmarks.length > 0) {
        console.log(questionIds)
        await dispatch(
          addQuestionsToBookmarks({
            bookmarkIds: localSelectedBookmarks, 
            questionIds: questionIds 
          })
        ).unwrap();
      }
      alert('북마크에 질문이 추가되었습니다.');
      onClose();
    } catch (error) {
      console.error('북마크 추가 실패:', error);
      alert('북마크에 질문을 추가하는데 실패했습니다.');
      onClose();
    }
  };

  // 북마크 추가
  const handleAddBookmark = async (title: string, description: string, accessLevel: string) => {
    try {
      await dispatch(
        createBookmark({
          name: title,
          description,
          accessLevel: accessLevel as 'PUBLIC' | 'PRIVATE' | 'PROTECTED',
        })
      ).unwrap();
      if (memberId !== null) await dispatch(fetchAllBookmarks(memberId));
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
            <button className="bookmark-close-btn" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="bookmark-content">
            {bookmarks.map((bookmark) => (
              <div key={bookmark.bookmarkId} className="bookmark-item">
                <input
                  type="checkbox"
                  checked={localSelectedBookmarks.includes(bookmark.bookmarkId)}
                  onChange={() => handleCheckboxChange(bookmark.bookmarkId)}
                />
                <span 
                  className="bookmark-name" 
                  onClick={() => handleCheckboxChange(bookmark.bookmarkId)}
                  >
                    {bookmark.name}
                </span>
                <span className="bookmark-lock-icon">
                  {bookmark.accessLevel === 'PRIVATE' && <IoLockClosed size={18} />}
                  {bookmark.accessLevel === 'PUBLIC' && <IoLockOpen size={18} />}
                  {bookmark.accessLevel === 'PROTECTED' && (
                    <IoLockClosed size={18} style={{ opacity: 0.5 }} />
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="bookmark-actions">
            <button className="add-bookmark-btn" onClick={() => setIsAddBookmarkOpen(true)}>
              + 새 북마크 추가하기
            </button>
            <button className="save-bookmark-btn" onClick={handleSave}>
              저장
            </button>
          </div>
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
