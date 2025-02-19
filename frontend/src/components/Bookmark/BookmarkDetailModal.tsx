import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/useRedux';
import { fetchBookmarkById, deleteBookmarkById } from '../../store/actions/bookmarkActions';
import './BookmarkDetailModal.css';
import { HiOutlineTrash, HiOutlinePencilAlt } from 'react-icons/hi';
import { IoAddCircleOutline } from 'react-icons/io5';

interface BookmarkDetailModalProps {
  bookmarkId: number;
  onClose: () => void; // 모달 닫기 함수
}

const BookmarkDetailModal: React.FC<BookmarkDetailModalProps> = ({ bookmarkId, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedBookmark, loading } = useAppSelector((state) => state.bookmarks);
  const [isDeleting, setIsDeleting] = useState(false);

  // 북마크 데이터 가져오기
  useEffect(() => {
    dispatch(fetchBookmarkById(bookmarkId));
  }, [dispatch, bookmarkId]);

  // 질문 상세 페이지로 이동
  const handleQuestionClick = (questionId: number) => {
    navigate(`/question/${questionId}`);
    onClose();
  };

  // 북마크 삭제 핸들러
  const handleDelete = async () => {
    if (!window.confirm('북마크를 정말 삭제하시겠습니까?')) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteBookmarkById(bookmarkId)).unwrap();
      alert('북마크가 삭제되었습니다.');
      onClose();
    } catch (error) {
      console.error('북마크 삭제 중 오류 발생:', error);
      alert('북마크 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || !selectedBookmark) return <div className="bookmark-detail-loading">로딩 중...</div>;

  return (
    <div className="bookmark-detail-modal">
      <div className="bookmark-detail-modal-header">
        <h2>{selectedBookmark.name}</h2>
        <button className="bookmark-detail-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
      <p className="bookmark-detail-modal-description">
        {selectedBookmark.description || '북마크 설명이 없습니다.'}
      </p>
      <div className="bookmark-detail-questions-list">
        {selectedBookmark.questions?.map((question) => (
          <div
            key={question.id}
            className="bookmark-detail-question-item"
            onClick={() => handleQuestionClick(question.id)}
          >
            {question.content}
          </div>
        ))}
      </div>
      <div className="bookmark-detail-modal-actions">
        <button
          className="bookmark-detail-delete-btn"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <HiOutlineTrash /> 북마크 삭제
        </button>
        <button className="bookmark-detail-edit-btn">
          <HiOutlinePencilAlt /> 북마크 수정
        </button>
        <button
          className="bookmark-detail-add-questions-btn"
          onClick={() => navigate('/allquestion')}
        >
          <IoAddCircleOutline /> 질문 추가하기
        </button>
      </div>
    </div>
  );
};

export default BookmarkDetailModal;