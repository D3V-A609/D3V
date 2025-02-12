import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks/useRedux";
import { fetchComments } from "../../store/actions/commentActions";
import CommentItem from "./CommentItem";
import "./CommentList.css";

interface CommentListProps {
  articleId: number;
}

const CommentList: React.FC<CommentListProps> = ({ articleId }) => {
  const dispatch = useAppDispatch();
  const { comments, loading, error, pagination } = useAppSelector((state) => state.comments);
  const currentUserId = 1; // 현재 사용자의 memberId를 1로 고정

  useEffect(() => {
    dispatch(fetchComments({ articleId, page: 1, size: 15 }));
  }, [dispatch, articleId]);

  if (loading) return <div>댓글을 불러오는 중...</div>;
  if (error) return <div>댓글을 불러오는데 실패했습니다: {error}</div>;

  return (
    <div className="comment-list">
      <h3>댓글 ({pagination.totalRecords})</h3>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isAuthor={comment.memberId === currentUserId}
          articleId={articleId}
        />
      ))}
    </div>
  );
};

export default CommentList;