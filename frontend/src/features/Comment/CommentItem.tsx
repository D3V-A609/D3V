import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { updateComment, deleteComment } from "../../store/actions/commentActions";
import { Comment } from "../../store/slices/commentSlice";
import Profile from "../../components/Profile/Profile";
import "./CommentItem.css";

interface CommentItemProps {
  comment: Comment;
  isAuthor: boolean;
  articleId: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, isAuthor, articleId }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const users = useAppSelector(state => state.user.users);
  const author = users[comment.memberId];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updateComment({ articleId, commentId: comment.id, content: editedContent })).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await dispatch(deleteComment({ articleId, commentId: comment.id })).unwrap();
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
      }
    }
  };

  return (
    <li className="comment-item">
    <div className="comment-profile">
      {author ? (
        <Profile
          profileImg={author.profileImg}
          favoriteJob={author.favoriteJob}
          nickname={author.nickname}
          userId={author.memberId}
        />
        ) : (
        <span>사용자 정보 없음</span>
      )}
    </div>
    <div className="comment-main">
      <div className="comment-content">
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p>{comment.content}</p>
        )}
      </div>
      <div className="comment-info">
        {isAuthor && (
          <div className="comment-actions">
            {isEditing ? (
              <>
                <button onClick={handleUpdate}>등록</button>
                <button onClick={handleCancel}>취소</button>
              </>
            ) : (
              <>
                <button onClick={handleEdit}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </>
            )}
          </div>
        )}
        <span className="date">
          {new Date(comment.createdAt).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}
        </span>
      </div>
    </div>
  </li>
  );
};

export default CommentItem;