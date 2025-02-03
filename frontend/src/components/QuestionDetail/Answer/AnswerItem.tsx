import React from 'react';
import dummyUsers from '../../../constants/dummyUsers';
import "./AnswerItem.css";

interface AnswerItemProps {
  answer: Answer;
}

const AnswerItem: React.FC<AnswerItemProps> = ({ answer }) => {
  const user = dummyUsers.find(user => user.memberId === answer.memberId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (!user) return null;

  return (
    <div className="answer-item">
      <div className="profile">
        <div className="profile-avatar">D3V</div>
        <div className="profile-info">
          <div className="profile-role">
            [<span className="role-name">{user.jobField}</span>] D3V
          </div>
          <div className="profile-name">
            <span className="name">{user.nickname}</span>
            <span className="suffix">님</span>
          </div>
        </div>
      </div>
      <div className="answer-content">{answer.answer}</div>
      <div className="answer-footer">
        <div className="answer-date">{formatDate(answer.createdAt)}</div>
        <div className="answer-buttons">
          <button className="btn-comment">댓글 보기 ({answer.commentCount})</button>
          <button className="btn-like">추천하기 ({answer.answerLike})</button>
        </div>
      </div>
    </div>
  );
};

export default AnswerItem;