import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/useRedux';
import FeedbackModal from './FeedbackModal';
import Profile from '../../../Profile/Profile';
import "./AnswerItem.css";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";
import { toggleLike } from '../../../../store/actions/answerActions';
import { RootState } from '../../../../store/reducers';

interface AnswerItemProps {
  answer: Answer;
}

const AnswerItem: React.FC<AnswerItemProps> = ({ answer }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(answer.like);
  const [localIsLiked, setLocalIsLiked] = useState(answer.isLiked);

  const user = useAppSelector((state: RootState) => 
    state.user.users[answer.memberId]
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}. ${month}. ${day}. ${hours}:${minutes}:${seconds}`;
  };
  
  const handleLikeClick = async () => {
    try {
      const resultAction = await dispatch(toggleLike(answer.answerId));
      if (toggleLike.fulfilled.match(resultAction)) {
        const { isLiked, like } = resultAction.payload;
        setLocalIsLiked(isLiked);
        setLocalLikeCount(like);
      }
    } catch (error) {
      console.error('추천 실패:', error);
    }
  };

  return (
    <>
      <div className="answer-item">
      {user && (
          <Profile
            profileImg={user.profileImg}
            favoriteJob={user.favoriteJob}
            nickname={user.nickname}
          />
        )}
        <div className="answer-content">{answer.content}</div>
        <div className="answer-footer">
          <div className="answer-date">{formatDate(answer.createdAt)}</div>
          <div className="answer-buttons">
            <button className="btn-comment" onClick={() => setIsModalOpen(true)}>
              <IoChatboxOutline className="button-icon" />
              댓글 보기 ({answer.count || 0})
            </button>
            <button 
              className="btn-like"
              onClick={handleLikeClick}
            >
              {localIsLiked ? (
                <AiFillLike className="button-icon liked-icon" />
              ) : (
                <AiOutlineLike className="button-icon" />
              )}
              좋아요 ({localLikeCount})
            </button>
          </div>
        </div>
      </div>
      {/* FeedbackModal에 answer 객체를 전달 */}
      <FeedbackModal
        answer={{...answer, isLiked: localIsLiked, like: localLikeCount}}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLikeUpdate={(isLiked, likeCount) => {
          setLocalIsLiked(isLiked);
          setLocalLikeCount(likeCount);
        }}
      />
    </>
  );
};

export default AnswerItem;
