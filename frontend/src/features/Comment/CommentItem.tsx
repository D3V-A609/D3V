import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { updateComment, deleteComment } from "../../store/actions/commentActions";
import dummyUsers from "../../constants/dummyUsers";
import { Comment } from "../../store/slices/commentSlice";

interface CommentItemProps {
  comment: Comment;
  isAuthor: boolean;
  articleId: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, isAuthor, articleId }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const member = dummyUsers.find((user) => user.memberId === comment.memberId);

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
      <div className="profile-section">
        {member ? (
          <>
            <img src={member.profileImg} alt="프로필" className="profile-avatar" />
            <span className="nickname">{member.nickname}</span>
          </>
        ) : (
          <span>사용자 정보 없음</span>
        )}
      </div>
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <p>{comment.content}</p>
      )}
      <span className="date">{new Date(comment.createdAt).toLocaleDateString()}</span>
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
    </li>
  );
};

export default CommentItem;