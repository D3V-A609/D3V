import React, { useState, useEffect, useRef } from 'react';
import { IoClose } from "react-icons/io5";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import { fetchFeedbacks, createFeedback, updateFeedback, deleteFeedback } from '../../../../store/actions/feedbackActions';
import { toggleLike } from '../../../../store/actions/answerActions';
import Profile from '../../../Profile/Profile';
import './FeedbackModal.css';
import { fetchMultipleUserInfo } from '../../../../store/actions/userActions';
import { RootState } from '../../../../store/reducers';
import SecureStorage from '../../../../store/services/token/SecureStorage';

interface FeedbackModalProps {
  answer: Answer;
  isOpen: boolean;
  onClose: () => void;
  onLikeUpdate: (isLiked: boolean, likeCount: number) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ answer, isOpen, onClose, onLikeUpdate }) => {
  const dispatch = useAppDispatch();
  const { feedbacks, error } = useAppSelector(state => state.feedbacks);
  const { users } = useAppSelector((state: RootState) => state.user);
  const [newFeedback, setNewFeedback] = useState('');
  const [editingFeedbackId, setEditingFeedbackId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const lastFeedbackElementRef = useRef<HTMLDivElement | null>(null);

  const currentUserId = SecureStorage.getMemberId();

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchFeedbacks(answer.answerId))
        .then((action) => {
          if (fetchFeedbacks.fulfilled.match(action)) {
            setHasMore(action.payload.length === 10);
            const uniqueUserIds = new Set([answer.memberId, ...action.payload.map(feedback => feedback.memberId)]);
            dispatch(fetchMultipleUserInfo(Array.from(uniqueUserIds)));
          }
        });
    }
  }, [dispatch, answer.answerId, answer.memberId, isOpen]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchFeedbacks(answer.answerId))
        .then((action) => {
          if (fetchFeedbacks.fulfilled.match(action)) {
            setHasMore(action.payload.length === 10);
          }
        });
    }
  }, [dispatch, answer.answerId, isOpen, page]);

  useEffect(() => {
    if (!hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (lastFeedbackElementRef.current) {
      observer.current.observe(lastFeedbackElementRef.current);
    }
  }, [hasMore]);

  const getUserInfo = (memberId: number) => users[memberId];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}. ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  };

  const handleLikeClick = async () => {
    try {
      const resultAction = await dispatch(toggleLike(answer.answerId));
      if (toggleLike.fulfilled.match(resultAction)) {
        const { isLiked, like } = resultAction.payload;
        onLikeUpdate(isLiked, like);
      }
    } catch (error) {
      console.error('좋아요 실패:', error);
    }
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
      await dispatch(deleteFeedback({ answerId: answer.answerId, feedbackId }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <IoClose className="close-button" onClick={onClose} />
        </div>

        <div className="answer-section">
          <div className="answer-header">
            {getUserInfo(answer.memberId) && (
              <Profile
                profileImg={getUserInfo(answer.memberId)?.profileImg || ''}
                favoriteJob={getUserInfo(answer.memberId)?.favoriteJob || ''}
                nickname={getUserInfo(answer.memberId)?.nickname || ''}
              />
            )}
          </div>
          <div className="answer-body">
            <p className="answer-text">{answer.content}</p>
          </div>
          <div className="answer-footer">
            <span className="answer-date">{formatDate(answer.createdAt)}</span>
            <button className={`like-button ${answer.isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
              {answer.isLiked ? (
                <AiFillLike className="button-icon liked-icon" />
              ) : (
                <AiOutlineLike className="button-icon" />
              )}
              좋아요 ({answer.like})
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <textarea
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="피드백을 입력하세요"
          />
          <button type="submit" className="feedback-submit-button">등록</button>
        </form>

        <div className="feedbacks-section">
          {error && <p>Error: {error}</p>}
          {feedbacks.map((feedback: Feedback, index: number) => {
            const user = getUserInfo(feedback.memberId);
            return (
              <div 
                key={feedback.feedbackId} 
                className="feedback-item"
                ref={index === feedbacks.length - 1 ? lastFeedbackElementRef : null}
              >
                <div className="feedback-header">
                  <div className="feedback-profile">
                    {user && (
                      <Profile
                        profileImg={getUserInfo(answer.memberId)?.profileImg || ''}
                        favoriteJob={getUserInfo(answer.memberId)?.favoriteJob || ''}
                        nickname={getUserInfo(answer.memberId)?.nickname || ''}
                      />
                    )}
                  </div>
                  {feedback.memberId === currentUserId && !editingFeedbackId && (
                    <div className="feedback-actions">
                      <button onClick={() => handleEdit(feedback.feedbackId, feedback.content)}>수정</button>
                      <button onClick={() => handleDelete(feedback.feedbackId)}>삭제</button>
                    </div>
                  )}
                </div>
                <div className="feedback-body">
                  {editingFeedbackId === feedback.feedbackId ? (
                    <>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      />
                      <div className="edit-actions">
                        <button onClick={() => handleUpdate(feedback.feedbackId)}>수정 완료</button>
                        <button onClick={() => setEditingFeedbackId(null)}>취소</button>
                      </div>
                    </>
                  ) : (
                    <p className="feedback-content">{feedback.content}</p>
                  )}
                </div>
                <div className="feedback-footer">
                  <span className="feedback-date">{formatDate(feedback.createdAt)}</span>
                </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
