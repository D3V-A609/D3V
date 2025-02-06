import React from 'react';
import { useState, useEffect } from 'react';
import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import AddBookmarkModal from './AddBookmarkModal';
import './BookmarkModal.css';

// 북마크 모달 컴포넌트의 props 타입 정의
interface BookmarkModalProps {
  questionId: number; // // 현재 질문 ID
  onClose: () => void;  // 모달 닫기 함수
}

// 북마크 리스트 아이템의 타입 정의
interface BookmarkList {
  bookmarkId: number;     // 북마크 고유 ID
  name: string;           // 북마크 이름
  access_level: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';  // 북마크 공개 여부
  question_count: number; // 북마크에 저장된 질문 수
}

const BookmarkModal: React.FC<BookmarkModalProps> = ({ onClose, questionId }) => {
  // 북마크 리스트 상태 관리
  const [bookmarks, setBookmarks] = useState<BookmarkList[]>([
    { bookmarkId: 0, name: '북마크한 질문 모음', access_level: 'FRIENDS', question_count: 0 },
    { bookmarkId: 1, name: '카카오 백앤드 기출 질문 모음', access_level: 'PRIVATE', question_count: 0 },
    { bookmarkId: 2, name: '네이버 프론트 기출 질문 모음', access_level: 'PUBLIC', question_count: 0 },
    { bookmarkId: 3, name: 'CSS 질문 모음', access_level: 'PUBLIC', question_count: 0 },
    { bookmarkId: 4, name: '기타 질문 모음', access_level: 'PRIVATE', question_count: 0 }
  ]);

  // 현재 질문이 저장된 북마크 ID 목록
  const [savedBookmarks, setSavedBookmarks] = useState<number[]>([]);

  // 컴포넌트 마운트 시 현재 질문이 저장된 북마크 정보 가져오기
  useEffect(() => {
    const fetchSavedBookmarks = async () => {
      try {
        // API 호출 예시
        // const response = await getQuestionBookmarks(questionId);
        // setSavedBookmarks(response.bookmarkIds);
      } catch (error) {
        console.error('북마크 정보 조회 실패:', error);
      }
    };

    fetchSavedBookmarks();
  }, [questionId]);

  // 체크박스 선택/해제 시 북마크 추가/제거
  const handleCheckboxChange = async (bookmarkId: number) => {
    try {
      if (savedBookmarks.includes(bookmarkId)) {
        // 북마크 제거 API 호출
        // await removeQuestionFromBookmark(bookmarkId, questionId);
        setSavedBookmarks(prev => prev.filter(id => id !== bookmarkId));
      } else {
        // 북마크 추가 API 호출
        // await addQuestionToBookmark(bookmarkId, questionId);
        setSavedBookmarks(prev => [...prev, bookmarkId]);
      }
    } catch (error) {
      console.error('북마크 업데이트 실패:', error);
    }
  };

  // 새로운 북마크 폴더 생성
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <div className="bookmark-modal">
        {/* 모달 헤더 */}
        <div className="bookmark-header">
          <h2>북마크 리스트</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        {/* 북마크 리스트 컨텐츠 */}
        <div className="bookmark-content">
          {bookmarks.map(bookmark => (
            <div key={bookmark.bookmarkId} className="bookmark-item">
              <input 
                type="checkbox"
                checked={savedBookmarks.includes(bookmark.bookmarkId)}
                onChange={() => handleCheckboxChange(bookmark.bookmarkId)}
              />
              <span>{bookmark.name}</span>
              {/* 공개/비공개 상태 표시 아이콘 (클릭 불가) */}
              <button className="lock-btn">
                {bookmark.access_level === 'PRIVATE' 
                  ? (
                    <>
                      <IoLockClosed size={18} />
                      <span className="access-level-text">비공개</span>
                    </>
                  ) 
                  : bookmark.access_level === 'FRIENDS' 
                  ? (
                    <>
                      <IoLockClosed size={18} />
                      <span className="access-level-text">친구 공개</span>
                    </>
                  )
                  : (
                    <>
                      <IoLockOpen size={18} />
                      <span className="access-level-text">전체 공개</span>
                    </>
                  )
                }
              </button>
            </div>
          ))}
        </div>
        {/* 새 북마크 폴더 추가 버튼 */}
        <button 
          className="add-bookmark-btn"
          onClick={() => setShowAddModal(true)}
        >
          + 새 북마크 폴더 추가
        </button>
      </div>

      {showAddModal && (
        <AddBookmarkModal onClose={() => setShowAddModal(false)} />
      )}

    </>
    
  );
};

export default BookmarkModal;
