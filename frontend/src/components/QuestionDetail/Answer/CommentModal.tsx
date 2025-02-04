import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import dummyUsers from '../../../constants/dummyUsers';
import dummyComments from '../../../constants/dummyComments';
import './CommentModal.css';
import { useAppDispatch } from '../../../store/hooks/useRedux';
import { toggleLike } from '../../../store/slices/answerSlice';

interface CommentModalProps {
  answer: Answer;
  isOpen: boolean;
  onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ answer, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(answer.isLiked || false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState('');
  const answerAuthor = dummyUsers.find(user => user.memberId === answer.memberId);
  const comments = dummyComments.filter(comment => comment.answerId === answer.answerId);

  const commentsPerPage = 10;
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewComment('');
  };

  const handleLikeClick = async () => {
    try {
      await dispatch(toggleLike(answer.answerId)).unwrap();
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('추천 실패:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <IoClose className="close-button" onClick={onClose} />
        </div>

        <div className="answer-section">
          <div className="profile">
            <div className="profile-avatar">D3V</div>
            <div className="profile-info">
              <div className="profile-role">
                [<span className="role-name">{answerAuthor?.jobField}</span>] D3V
              </div>
              <div className="profile-name">
                <span className="name">{answerAuthor?.nickname}</span>
                <span className="suffix">님</span>
              </div>
            </div>
          </div>
          <div className="answer-text">{answer.content}</div> {/* answer -> content로 변경 */}
          <div className="answer-actions">
            <button className="like-button" onClick={handleLikeClick}>
              {isLiked ? (
                <AiFillLike className="button-icon liked-icon" />
              ) : (
                <AiOutlineLike className="button-icon" />
              )}
              <span>추천하기</span>
              <span style={{ marginLeft: '5px' }}>({answer.like})</span>
            </button>
          </div>
        </div>

        <div className="comments-section">
          {currentComments.map(comment => {
            const commentAuthor = dummyUsers.find(user => user.memberId === comment.memberId);
            return (
              <div key={comment.commentId} className="comment-item">
                <div className="profile">
                  <div className="profile-avatar">D3V</div>
                  <div className="profile-info">
                    <div className="profile-role">
                      [<span className="role-name">{commentAuthor?.jobField}</span>] D3V
                    </div>
                    <div className="profile-name">
                      <span className="name">{commentAuthor?.nickname}</span>
                      <span className="suffix">님</span>
                    </div>
                  </div>
                </div>
                <div className="comment-text">{comment.content}</div>
              </div>
            );
          })}
        </div>

        <div className="pagination">
          <button className="page-button">&laquo;</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button className="page-button">&raquo;</button>
        </div>

        <div className="comment-form">
          <textarea
            className="comment-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 등록하세요"
          />
          <button className="submit-button" onClick={handleSubmit}>
            댓글 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
