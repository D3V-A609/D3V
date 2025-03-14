// BookmarkDetailModal.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/useRedux';
import { fetchBookmarkById, deleteBookmarkById } from '../../store/actions/bookmarkActions';
import './BookmarkDetailModal.css';
import { HiOutlineTrash, HiOutlinePencilAlt } from 'react-icons/hi';
import { IoAddCircleOutline } from 'react-icons/io5';
import { moveToQuestionDetail } from "../../utils/navigation";
import QuestionSkillTag from '../QuestionDetail/Question/QuestionSkillTag';
import EditBookmarkModal from './EditBookmarkModal';

interface BookmarkDetailModalProps {
  bookmarkId: number | null;
  onClose: () => void;
  onBookmarksChanged: () => void;
  isOwner: boolean; // ✅ 내 북마크인지 여부 추가
}

const BookmarkDetailModal: React.FC<BookmarkDetailModalProps> = ({ bookmarkId, onClose, onBookmarksChanged, isOwner }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedBookmark, loading } = useAppSelector((state) => state.bookmarks);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 북마크 데이터 가져오기
  useEffect(() => {
    if (bookmarkId !== null) {
      dispatch(fetchBookmarkById(bookmarkId));
    }
  }, [dispatch, bookmarkId]);

  // 북마크 삭제 핸들러
  const handleDelete = async () => {
    if (!window.confirm('북마크를 정말 삭제하시겠습니까?')) return;
    if (bookmarkId === null) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteBookmarkById(bookmarkId)).unwrap();
      alert('북마크가 삭제되었습니다.');
      onClose();
      onBookmarksChanged();
    } catch (error) {
      console.error('북마크 삭제 중 오류 발생:', error);
      alert('북마크 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || !selectedBookmark) return <div className="bookmark-detail-loading">모달이 오고 있어용</div>;

  return (
    <>
      <div className="bookmark-detail-modal">
        <div className="bookmark-detail-modal-header">
          <span className="bookmark-detail-name">{selectedBookmark.name}</span>
          <button className="bookmark-detail-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* 북마크 설명이 있을 때만 표시 */}
        {selectedBookmark.description && (
          <p className="bookmark-detail-modal-description">{selectedBookmark.description}</p>
        )}
        <div className="bookmark-detail-divider"></div>

        <div className="bookmark-detail-questions-list">
          {selectedBookmark.questions?.map((question) => (
            <div
              key={question.questionId}
              className="bookmark-detail-question-item"
              onClick={() => moveToQuestionDetail(navigate, dispatch, question.questionId)}
            >
              {question.skill && (
                <div className="bookmark-detail-question-skill">
                  <QuestionSkillTag skill={question.skill} className="bookmark-preview-skill-tag" />
                </div>
              )}
              <span className="bookmark-detail-question-content">{question.content}</span>
            </div>
          ))}
        </div>

        {/* ✅ isOwner가 true일 때만 수정/삭제/추가 버튼 보이기 */}
        {isOwner && (
          <div className="bookmark-detail-modal-actions">
            <button className="bookmark-detail-delete-btn" onClick={handleDelete} disabled={isDeleting}>
              <HiOutlineTrash /> 북마크 삭제
            </button>
            <button className="bookmark-detail-edit-btn" onClick={() => setIsEditModalOpen(true)}>
              <HiOutlinePencilAlt /> 북마크 수정
            </button>
            <button className="bookmark-detail-add-questions-btn" onClick={() => navigate('/all-questions')}>
              <IoAddCircleOutline /> 질문 추가하기
            </button>
          </div>
        )}
      </div>

      {/* 북마크 수정 모달 */}
      {isEditModalOpen && (
        <EditBookmarkModal
          bookmark={selectedBookmark}
          onClose={() => {
            setIsEditModalOpen(false);
            onBookmarksChanged();
          }}
        />
      )}
    </>
  );
};

export default BookmarkDetailModal;
