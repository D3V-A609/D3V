import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import { fetchFeedbacks, createFeedback, updateFeedback, deleteFeedback } from '../../../../store/actions/feedbackActions';
import Profile from '../../../Profile/Profile';
import Pagination from '../../../Pagination/Pagination';
import dummyUsers from '../../../../constants/dummyUsers';
import './FeedbackModal.css';

interface FeedbackModalProps {
  answer: Answer;
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ answer, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { feedbacks, loading, error } = useAppSelector(state => state.feedbacks);
  const [newFeedback, setNewFeedback] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingFeedbackId, setEditingFeedbackId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const feedbacksPerPage = 10;
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);
  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchFeedbacks(answer.answerId));
    }
  }, [dispatch, answer.answerId, isOpen]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}. ${month}. ${day}. ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeedback.trim()) {
      await dispatch(createFeedback({ answerId: answer.answerId, content: newFeedback }));
      setNewFeedback('');
    }
  };

  const handleEdit = (feedbackId: number, content: string) => {
    setEditingFeedbackId(feedbackId);
    setEditContent(content);
  };

  const handleUpdate = async (feedbackId: number) => {
    if (editContent.trim()) {
      await dispatch(updateFeedback({ answerId: answer.answerId, feedbackId, content: editContent }));
      setEditingFeedbackId(null);
    }
  };

  const handleDelete = async (feedbackId: number) => {
    if (window.confirm('정말로 이 피드백을 삭제하시겠습니까?')) {
      await dispatch(deleteFeedback({ answerId: answer.answerId, feedbackId, memberId: 1}));
    }
  };

  const currentUserId = 1; // 현재 사용자의 ID

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* 닫기 버튼 */}
        <div className="modal-header">
          <IoClose className="close-button" onClick={onClose} />
        </div>

        {/* 답변 섹션 */}
        <div className="answer-section">
          <Profile
            profileImg={dummyUsers.find(user => user.memberId === answer.memberId)?.profileImg || ''}
            jobField={dummyUsers.find(user => user.memberId === answer.memberId)?.jobField || ''}
            nickname={dummyUsers.find(user => user.memberId === answer.memberId)?.nickname || ''}
          />
          <div className="answer-text">{answer.content}</div>
          <div className="answer-date">{formatDate(answer.createdAt)}</div>
          <div className="answer-actions">
            <button className="like-button">
              좋아요 ({answer.like})
            </button>
          </div>
        </div>

        {/* 피드백 섹션 */}
        <div className="feedbacks-section">
          {loading && <p>피드백을 불러오는 중...</p>}
          {error && <p>Error: {error}</p>}
          {currentFeedbacks.map((feedback: Feedback) => {
            const user = dummyUsers.find(user => user.memberId === feedback.memberId);
            return (
              <div key={feedback.feedbackId} className="feedback-item">
                {user && (
                  <Profile
                    profileImg={user.profileImg}
                    jobField={user.jobField}
                    nickname={user.nickname}
                  />
                )}
                <p className="feedback-content">{feedback.content}</p>
                <p className="feedback-date">{formatDate(feedback.createdAt)}</p>
                {feedback.memberId === currentUserId && (
                  <div className="feedback-actions">
                    <button onClick={() => handleEdit(feedback.feedbackId, feedback.content)}>수정</button>
                    <button onClick={() => handleDelete(feedback.feedbackId)}>삭제</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          first={currentPage === 1}
          last={currentPage === totalPages}
        />

        {/* 피드백 입력란 */}
        <form onSubmit={handleSubmit} className="feedback-form">
          <textarea
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="피드백을 입력하세요"
          />
          <button type="submit" className="submit-button">등록</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;