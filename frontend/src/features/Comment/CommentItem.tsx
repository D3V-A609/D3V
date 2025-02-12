import React from "react";
import { Comment } from "../../store/slices/commentSlice";
import dummyUsers from "../../constants/dummyUsers";

interface CommentItemProps {
    comment: Comment;
    isAuthor: boolean;
    articleId: number;
  }

const CommentItem: React.FC<CommentItemProps> = ({ comment, isAuthor, articleId }) => {
  const member = dummyUsers.find((user) => user.memberId === comment.memberId);

  return (
    <li className="comment-item">
      <div className="profile-section">
        {member ? (
          <>
            <img src={member.profileImg} alt="프로필" className="profile-avatar" />
            <span className="nickname">{member.nickname}</span>
          </>
        ) : (
          <span>익명</span>
        )}
      </div>
      <p>{comment.content}</p>
      <span className="date">{new Date(comment.createdAt).toLocaleDateString()}</span>
    </li>
  );
};

export default CommentItem;
