import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { fetchComments } from "../../store/actions/commentActions";
import dummyUsers from "../../constants/dummyUsers";
import Pagination from "../../components/Pagination/Pagination"; // Pagination 컴포넌트 임포트
import "./CommentList.css";
import { Comment } from "../../store/slices/commentSlice";
import { RootState } from "../../store/index";

interface CommentListProps {
  articleId: number;
}


const CommentList: React.FC<CommentListProps> = ({ articleId }) => {
  const dispatch = useAppDispatch();

  const { comments = [], loading = false, error = null, pagination = { currentPage: 1, totalPages: 1 } } = useAppSelector((state: RootState) => ({
    comments: state.comments?.comments ?? [],
    loading: state.comments?.loading ?? false,
    error: state.comments?.error ?? null,
    pagination: state.comments?.pagination ?? { currentPage: 1, totalPages: 1 },
  }));


  useEffect(() => {
    if (articleId) {
      dispatch(fetchComments({ articleId, page: pagination.currentPage, size: 15 }));
    }
  }, [dispatch, articleId, pagination.currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error}</div>;

  const handlePageChange = (pageNumber: number) => {
    dispatch(fetchComments({ articleId, page: pageNumber + 1, size: 15 }));
  };

  return (
    <div className="comment-list">
      <ul>
        {comments.map((comment: Comment) => {
          const member = dummyUsers.find((user) => user.memberId === comment.memberId);
          return (
            <li key={comment.id} className="comment-item">
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
        })}
      </ul>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={pagination.currentPage - 1} // Pagination 컴포넌트는 0-based 인덱스를 사용
        totalPages={pagination.totalPages}
        first={pagination.currentPage === 1}
        last={pagination.currentPage === pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CommentList;
