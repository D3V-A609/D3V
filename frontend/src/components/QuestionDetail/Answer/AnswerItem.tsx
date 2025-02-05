import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks/useRedux';
import { toggleLike } from '../../../store/slices/answerSlice';
import CommentModal from './CommentModal';
import dummyUsers from '../../../constants/dummyUsers';
import "./AnswerItem.css";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";

interface AnswerItemProps {
  answer: Answer;
}

const AnswerItem: React.FC<AnswerItemProps> = ({ answer }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(answer.isLiked || false);

  // dummyUsers에서 멤버 데이터 조회
  const member = dummyUsers.find(user => user.memberId === answer.memberId);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const handleLikeClick = async () => {
    try {
      const resultAction = await dispatch(toggleLike(answer.answerId));
      if (toggleLike.fulfilled.match(resultAction)) {
        const { like } = resultAction.payload;
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error('추천 실패:', error);
    }
  };
  

  if (!member) return null;  // 멤버 데이터가 없으면 렌더링 안 함

  return (
    <>
      <div className="answer-item">
        <div className="profile">
          <div className="profile-avatar">
            {member.profileImg ? (
              <img src={member.profileImg} alt="profile" />
            ) : (
              <div className="avatar-fallback">{member.nickname[0].toUpperCase()}</div>
            )}
          </div>
          <div className="profile-info">
            <div className="profile-role">
              [<span className="role-name">{member.jobField}</span>]
            </div>
            <div className="profile-name">
              <span className="name">{member.nickname}</span>
              <span className="suffix">님</span>
            </div>
          </div>
        </div>
        <div className="answer-content">{answer.content}</div>
        <div className="answer-footer">
          <div className="answer-date">{formatDate(answer.createdAt)}</div>
          <div className="answer-buttons">
          <button className="btn-comment" onClick={() => setIsModalOpen(true)}>
              <IoChatboxOutline className="button-icon" />
              댓글 보기 ({answer.commentCount || 0})
            </button>
            <button 
              className="btn-like"
              onClick={handleLikeClick}
            >
              {isLiked ? (
                <AiFillLike className="button-icon liked-icon" />
              ) : (
                <AiOutlineLike className="button-icon" />
              )}
              추천하기 ({answer.like || 0})
            </button>
          </div>
        </div>
      </div>
      <CommentModal 
        answer={answer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AnswerItem;
