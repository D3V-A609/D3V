import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { fetchComments } from "../../store/actions/commentActions";
import CommentItem from "./CommentItem";
import Pagination from "../../components/Pagination/Pagination";
import "./CommentList.css";
import SecureStorage from "../../store/services/token/SecureStorage";

interface CommentListProps {
  articleId: number;
}

const CommentList: React.FC<CommentListProps> = ({ articleId }) => {
  const dispatch = useAppDispatch();
  const { comments, loading, error, pagination } = useAppSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments({ articleId, page: 1, size: 10 }));
  }, [dispatch, articleId]);

  if (loading) return <div>댓글을 불러오는 중...</div>;
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
          isAuthor={comment.memberId === Number(SecureStorage.getMemberId())} 
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