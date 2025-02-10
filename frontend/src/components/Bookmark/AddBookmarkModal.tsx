// components/Bookmark/AddBookmarkModal.tsx
import React from 'react';
import { useState } from 'react';
import './BookmarkModal.css';

interface AddBookmarkModalProps {
  onClose: () => void;
  onSave?: (bookmarkData: {
    name: string;
    description: string;
    access_level: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  }) => void;
}

const AddBookmarkModal: React.FC<AddBookmarkModalProps> = ({ onClose, onSave }) => {
  const [bookmarkData, setBookmarkData] = useState({
    name: '',
    description: '',
    access_level: 'PUBLIC' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(bookmarkData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="add-bookmark-modal">
      <div className="bookmark-header">
        <h2>새 북마크 폴더 추가</h2>
        <button type="button" className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="add-bookmark-content">
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
        <div className="input-group">
          <label>상세 설명 (선택)</label>
          <textarea 
            placeholder="북마크에 대한 설명을 입력하세요"
            className="bookmark-textarea"
            value={bookmarkData.description}
            onChange={(e) => setBookmarkData({...bookmarkData, description: e.target.value})}
          />
        </div>
        <div className="input-group">
          <label>공개 범위</label>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="access" 
                value="FRIENDS"
                checked={bookmarkData.access_level === 'FRIENDS'}
                onChange={(e) => setBookmarkData({...bookmarkData, access_level: e.target.value as 'PRIVATE'})}
              />
              친구공개
            </label>
            <label>
              <input 
                type="radio" 
                name="access" 
                value="PRIVATE"
                checked={bookmarkData.access_level === 'PRIVATE'}
                onChange={(e) => setBookmarkData({...bookmarkData, access_level: e.target.value as 'PRIVATE'})}
              />
              비공개
            </label>
            <label>
              <input 
                type="radio" 
                name="access" 
                value="PUBLIC"
                checked={bookmarkData.access_level === 'PUBLIC'}
                onChange={(e) => setBookmarkData({...bookmarkData, access_level: e.target.value as 'PUBLIC'})}
              />
              공개
            </label>
          </div>
        </div>
      </div>
      <div className="modal-buttons">
        <button type="button" className="cancel-btn" onClick={onClose}>취소</button>
        <button type="submit" className="save-btn">저장</button>
      </div>
    </form>
  );
};

export default AddBookmarkModal;