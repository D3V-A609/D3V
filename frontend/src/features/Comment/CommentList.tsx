import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { fetchComments } from "../../store/actions/commentActions";
import { fetchMultipleUserInfo } from "../../store/actions/userActions";
import CommentItem from "./CommentItem";
import Pagination from "../../components/Pagination/Pagination";
import "./CommentList.css";

interface CommentListProps {
  articleId: number;
}

const CommentList: React.FC<CommentListProps> = ({ articleId }) => {
  const dispatch = useAppDispatch();
  const { comments, error, pagination } = useAppSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments({ articleId, page: 1, size: 10 }));
  }, [dispatch, articleId]);

  useEffect(() => {
    if (comments.length > 0) {
      const userIds = [...new Set(comments.map(comment => comment.memberId))];
      dispatch(fetchMultipleUserInfo(userIds));
    }
  }, [dispatch, comments]);

  if (error) return <div>댓글을 불러오는데 실패했습니다: {error}</div>;

  const handlePageChange = (page: number) => {
    dispatch(fetchComments({ articleId, page, size: 10 }));
  };

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isAuthor={comment.memberId === 1} // 현재 사용자의 ID를 1로 가정
          articleId={articleId}
        />
      ))}
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage - 1}  // 0-based로 변환
          totalPages={pagination.totalPages}
          first={pagination.currentPage === 1}
          last={pagination.currentPage === pagination.totalPages}
          onPageChange={(page) => handlePageChange(page + 1)}  // 1-based로 변환하여 호출
        />
      )}
    </div>
  );
};

export default CommentList;