import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks/useRedux';
import { updateBookmarkById, deleteBookmarkQuestion, fetchBookmarkById } from '../../store/actions/bookmarkActions';
import './EditBookmarkModal.css';
import { HiOutlineTrash, HiX } from 'react-icons/hi';
import QuestionSkillTag from '../QuestionDetail/Question/QuestionSkillTag';

interface EditBookmarkModalProps {
  bookmark: Bookmark;
  onClose: () => void;
}

const EditBookmarkModal: React.FC<EditBookmarkModalProps> = ({ bookmark, onClose }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(bookmark.name);
  const [description, setDescription] = useState(bookmark.description || '');
  const [questions, setQuestions] = useState(bookmark.questions);

  const handleSaveChanges = async () => {
    try {
      await dispatch(updateBookmarkById({ 
        bookmarkId: bookmark.bookmarkId, 
        data: { name, description } 
      })).unwrap();
      alert('북마크가 수정되었습니다.');
      dispatch(fetchBookmarkById(bookmark.bookmarkId));
      onClose();
    } catch (error) {
      console.error('북마크 수정 중 오류 발생:', error);
      alert('북마크 수정에 실패했습니다.');
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (!window.confirm('이 질문을 북마크에서 삭제하시겠습니까?')) return;
    try {
      await dispatch(deleteBookmarkQuestion({ bookmarkId: bookmark.bookmarkId, questionId })).unwrap();
      setQuestions(questions.filter(q => q.questionId !== questionId));
    } catch (error) {
      console.error('질문 삭제 중 오류 발생:', error);
      alert('질문 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="edit-bookmark-modal">
      <div className="edit-bookmark-modal-header">
        <h2>북마크 수정</h2>
        <button className="edit-bookmark-close-btn" onClick={onClose}>
          <HiX />
        </button>
      </div>
      <label className="edit-bookmark-label">북마크 제목</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="edit-bookmark-input"
      />
      <label className="edit-bookmark-label">상세 설명</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="edit-bookmark-textarea"
      />
      <div className="edit-bookmark-questions-list">
        {questions.map((question) => (
          <div key={question.questionId} className="edit-bookmark-question-item">
            <QuestionSkillTag skill={question.skill} />
            <span>{question.content}</span>
            <button onClick={() => handleDeleteQuestion(question.questionId)} className="edit-bookmark-question-delete-btn">
              <HiOutlineTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="edit-bookmark-modal-actions">
        <button onClick={handleSaveChanges} className="edit-bookmark-save-btn">저장</button>
        <button onClick={onClose} className="edit-bookmark-cancel-btn">취소</button>
      </div>
    </div>
  );
};

export default EditBookmarkModal;