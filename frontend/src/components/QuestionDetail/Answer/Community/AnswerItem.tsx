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
  const [localFeedbackCount, setLocalFeedbackCount] = useState(answer.count || 0);

  const users = useAppSelector((state: RootState) => state.user.users);
  const user = users[answer.memberId];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}. ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
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
            nickname={user.nickname || ''}
            userId={user.memberId}
          />
        )}
        <div className="answer-content">{answer.content}</div>
        <div className="answer-footer">
          <div className="answer-date">{formatDate(answer.createdAt)}</div>
          <div className="answer-buttons">
            <button className="btn-comment" onClick={() => setIsModalOpen(true)}>
              <IoChatboxOutline className="button-icon" />
              피드백 보기 ({localFeedbackCount})
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
      <FeedbackModal
        answer={{...answer, isLiked: localIsLiked, like: localLikeCount}}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLikeUpdate={(isLiked, likeCount) => {
          setLocalIsLiked(isLiked);
          setLocalLikeCount(likeCount);
        }}
        onFeedbackCountUpdate={(count) => setLocalFeedbackCount(count)}
      />
    </>
  );
};

export default AnswerItem;