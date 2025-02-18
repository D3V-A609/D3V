import React, { useState } from 'react';
import './AddBookmarkModal.css';

interface AddBookmarkModalProps {
  onClose: () => void; // 모달 닫기 함수
  onSave: (title: string, description: string, accessLevel: string) => void;
}

const AddBookmarkModal: React.FC<AddBookmarkModalProps> = ({ onClose, onSave }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevel, setAccessLevel] = useState('PUBLIC'); // 기본값: 공개

  const handleSave = () => {
    if (!title.trim()) {
      alert('북마크 제목을 입력해주세요.');
      return;
    }

    onSave(title, description, accessLevel); // 부모 컴포넌트로 데이터 전달
    onClose(); // 저장 후 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="add-bookmark-modal">
        {/* 모달 헤더 */}
        <div className="add-bookmark-modal-header">
          <h2>새 북마크 추가</h2>
          <button className="add-bookmark-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="add-bookmark-modal-body">
            {/* 제목 입력 */}
            <label className="add-bookmark-label">북마크 제목</label>
            <input
            type="text"
            className="add-bookmark-input"
            placeholder="북마크 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            {/* 상세 설명 입력 */}
            <label className="add-bookmark-label">상세 설명 (선택)</label>
            <textarea
            className="add-bookmark-textarea"
            placeholder="북마크에 대한 설명을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

            {/* 공개 범위 선택 */}
            <label className="add-bookmark-label">공개 범위</label>
            <div className="add-bookmark-radio-group">
            <label>
                <input
                type="radio"
                name="accessLevel"
                value="PROTECTED"
                checked={accessLevel === 'PROTECTED'}
                onChange={(e) => setAccessLevel(e.target.value)}
                />
                친구 공개
            </label>
            <label>
                <input
                type="radio"
                name="accessLevel"
                value="PRIVATE"
                checked={accessLevel === 'PRIVATE'}
                onChange={(e) => setAccessLevel(e.target.value)}
                />
                비공개
            </label>
            <label>
                <input
                type="radio"
                name="accessLevel"
                value="PUBLIC"
                checked={accessLevel === 'PUBLIC'}
                onChange={(e) => setAccessLevel(e.target.value)}
                />
                공개
            </label>
            </div>
        </div>
        
        {/* 하단 버튼 */}
        <div className="add-bookmark-modal-footer">
          <button className="add-bookmark-cancel-btn" onClick={onClose}>
            취소
          </button>
          <button className="add-bookmark-save-btn" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookmarkModal;