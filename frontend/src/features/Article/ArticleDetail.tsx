import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { fetchArticle, deleteArticle } from "../../store/actions/articleActions";
import { fetchMultipleUserInfo } from "../../store/actions/userActions";
import CommentInput from "../Comment/CommentInput";
import Profile from "../../components/Profile/Profile";
import CommentList from "../Comment/CommentList";
import EditArticle from "./EditArticle";
import { FaEye, FaComment } from "react-icons/fa6";
import SecureStorage from "../../store/services/token/SecureStorage";

import "./ArticleDetail.css";

const categoryNameMap: Record<string, string> = {
  JOB_REVIEW: "합격 후기",
  QUESTION_REVIEW: "답변 첨삭",
  INFO_SHARING: "정보 공유",
  ETC: "기타",
};

interface ArticleDetailProps {
  articleId: number;
  onBackClick: (isDeleted?: boolean) => void;
  userInfo: { [key: number]: User };
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ articleId, onBackClick, userInfo }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { currentArticle, error } = useAppSelector(state => state.articles);
  const users = useAppSelector(state => state.user.users);
  const currentUserId = SecureStorage.getMemberId();

  const fetchArticleData = useCallback(() => {
    if (articleId) {
      dispatch(fetchArticle(articleId));
    }
  }, [dispatch, articleId]);

  useEffect(() => {
    if (!isDeleting) {
      fetchArticleData();
    }
  }, [fetchArticleData, isDeleting]);

  useEffect(() => {
    if (currentArticle && !userInfo[currentArticle.memberId]) {
      dispatch(fetchMultipleUserInfo([currentArticle.memberId]));
    }
  }, [dispatch, currentArticle, userInfo]);

  if (error) return <div>{error}</div>;
  if (!currentArticle) return null;

  const author = userInfo[currentArticle.memberId] || users[currentArticle.memberId];
  const isAuthor = currentArticle.memberId === currentUserId;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        setIsDeleting(true);
        await dispatch(deleteArticle(currentArticle.id)).unwrap();
        alert("게시글이 성공적으로 삭제되었습니다.");
        onBackClick(true);
      } catch (error) {
        console.error("게시글 삭제 중 오류 발생:", error);
        alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <div className="article-detail">
      <div className="detail-header">
        <button className="back-button" onClick={() => onBackClick(false)}>
          목록
        </button>
      </div>

      {isEditing ? (
        <EditArticle
          article={currentArticle}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="detail-info">
            <div className="title-row">
              <span className="category">{categoryNameMap[currentArticle.name] || currentArticle.name}</span>
              <h1 className="title">{currentArticle.title}</h1>
          
              {isAuthor && (
                <div className="action-buttons">
                  <button className="edit-button" onClick={handleEdit}>수정</button>
                  <button className="delete-button" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? "삭제 중..." : "삭제"}
                  </button>
                </div>
              )}
            </div>
            <div className="meta-row">
              <div className="left-section">
                {author ? (
                  <Profile
                    profileImg={author.profileImg}
                    favoriteJob={author.favoriteJob}
                    nickname={author.nickname}
                  />
                ) : (
                  <span>작성자 정보를 불러올 수 없습니다.</span>
                )}
                <span className="date">
                  {new Date(currentArticle.createdAt).toLocaleString('ko-KR', {
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
              <div className="right-section">
                <div className="stat-item">
                  <FaEye className="icon" />
                  <span>{currentArticle.view}</span>
                </div>
                <div className="stat-item">
                  <FaComment className="icon" />
                  <span>{currentArticle.commentCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-content">
            {currentArticle.images?.length ? (
              currentArticle.images.map((image) => (
                <img key={image.id} src={image.imageUrl} alt={image.originImageName} />
              ))
            ) : null}
            <div
              dangerouslySetInnerHTML={{ __html: currentArticle.content }}
              className="article-content"
            ></div>
          </div>

          <div className="comment-header">
            <p className="comment-count">
              총 댓글 <span className="count-number">{currentArticle.commentCount}</span>개가 있습니다.
            </p>
          </div>

          <CommentList articleId={articleId} />
          <CommentInput articleId={articleId} />
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
