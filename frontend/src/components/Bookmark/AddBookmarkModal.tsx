// components/Bookmark/AddBookmarkModal.tsx
import React from 'react';
import { useState } from 'react';
import './BookmarkModal.css';

/**
 * 새로운 북마크 폴더를 추가하기 위한 모달 컴포넌트
 */
const AddBookmarkModal: React.FC<AddBookmarkModalProps> = ({ onClose, onSave }) => {
  // 북마크 데이터 상태 관리
  const [bookmarkData, setBookmarkData] = useState<BookmarkData>({
    name: '',
    description: '',
    access_level: 'PUBLIC'
  });

  /**
   * 폼 제출 핸들러
   * @param e - 폼 이벤트
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(bookmarkData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="add-bookmark-modal">
      {/* 모달 헤더 */}
      <div className="bookmark-header">
        <h2>새 북마크 폴더 추가</h2>
        <button type="button" className="close-btn" onClick={onClose}>×</button>
      </div>

      {/* 모달 컨텐츠 */}
      <div className="add-bookmark-content">
        {/* 북마크 제목 입력 */}
        <div className="input-group">
          <label>북마크 제목</label>
          <input 
            type="text" 
            placeholder="북마크 제목을 입력하세요"
            className="bookmark-input"
            value={bookmarkData.name}
            onChange={(e) => setBookmarkData({...bookmarkData, name: e.target.value})}
          />
        </div>

        {/* 북마크 설명 입력 */}
        <div className="input-group">
          <label>상세 설명 (선택)</label>
          <textarea 
            placeholder="북마크에 대한 설명을 입력하세요"
            className="bookmark-textarea"
            value={bookmarkData.description}
            onChange={(e) => setBookmarkData({...bookmarkData, description: e.target.value})}
          />
        </div>

        {/* 공개 범위 설정 */}
        <div className="input-group">
          <label>공개 범위</label>
          <div className="radio-group">
            {/* 친구 공개 옵션 */}
            <label>
              <input 
                type="radio" 
                name="access" 
                value="FRIENDS"
                checked={bookmarkData.access_level === 'FRIENDS'}
                onChange={(e) => setBookmarkData({...bookmarkData, access_level: e.target.value as AccessLevel})}
              />
              친구공개
            </label>
            {/* 비공개 옵션 */}
            <label>
              <input 
                type="radio" 
                name="access" 
                value="PRIVATE"
                checked={bookmarkData.access_level === 'PRIVATE'}
                onChange={(e) => setBookmarkData({...bookmarkData, access_level: e.target.value as AccessLevel})}
              />
              비공개
            </label>
            {/* 전체 공개 옵션 */}
            <label>
              <input 
                type="radio" 
                name="access" 
                value="PUBLIC"
                checked={bookmarkData.access_level === 'PUBLIC'}
                onChange={(e) => setBookmarkData({...bookmarkData, access_level: e.target.value as AccessLevel})}
              />
              공개
            </label>
          </div>
        </div>
      </div>

      {/* 모달 하단 버튼 */}
      <div className="modal-buttons">
        <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
        <button type="submit" className="save-btn">저장</button>
      </div>
    </form>
  );
};

export default AddBookmarkModal;
