import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { fetchArticle, deleteArticle } from "../../store/actions/articleActions";
import CommentInput from "../Comment/CommentInput";
import Profile from "../../components/Profile/Profile";
import dummyUsers from "../../constants/dummyUsers";
import CommentList from "../Comment/CommentList";
import EditArticle from "./EditArticle";
import { FaEye, FaComment } from "react-icons/fa6";

import "./ArticleDetail.css";

const categoryNameMap: Record<string, string> = {
  JOB_REVIEW: "합격 후기",
  QUESTION_REVIEW: "답변 첨삭",
  INFO_SHARING: "정보 공유",
  ETC: "기타",
};

interface ArticleDetailProps {
  articleId: number;
  onBackClick: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ articleId, onBackClick }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { currentArticle, loading, error } = useAppSelector(
    (state) => state.articles || { currentArticle: null, loading: false, error: null }
  );

  const currentUserId = 1; // 현재 사용자의 memberId를 1로 고정

  useEffect(() => {
    if (!currentArticle || currentArticle.id !== articleId) {
      dispatch(fetchArticle(articleId));
    }
  }, [dispatch, articleId, currentArticle]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const member = dummyUsers.find(user => user.memberId === currentArticle?.memberId);
  const isAuthor = currentUserId === currentArticle?.memberId;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = useCallback(async () => {
    if (isDeleting) return; // 이미 삭제 중이면 실행하지 않음
    if (currentArticle && window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        setIsDeleting(true); // 삭제 중 상태 설정
        await dispatch(deleteArticle(currentArticle.id)).unwrap();
        alert("게시글이 성공적으로 삭제되었습니다.");
        onBackClick(); // 게시글 목록으로 이동
      } catch (error) {
        console.error("게시글 삭제 중 오류 발생:", error);
        alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsDeleting(false); // 삭제 완료 후 상태 초기화
      }
    }
  }, [currentArticle, isDeleting, dispatch, onBackClick]);

  return (
    <div className="article-detail">
      <div className="detail-header">
        <div className="left-buttons">
          {isAuthor && !isEditing && (
            <>
              <button className="edit-button" onClick={handleEdit}>수정</button>
              <button className="delete-button" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
            </>
          )}
        </div>
        <div className="right-buttons">
          <button className="back-button" onClick={onBackClick}>
            목록
          </button>
        </div>
      </div>

      {currentArticle && (
        <>
          {isEditing ? (
            <EditArticle
              article={currentArticle}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              {/* 게시글 정보 */}
              <div className="detail-info">
                <div className="title-row">
                  <span className="category">{categoryNameMap[currentArticle.name] || currentArticle.name}</span>
                  <h1 className="title">{currentArticle.title}</h1>
                </div>
                <div className="meta-row">
                  <div className="left-section">
                    {member ? (
                      <Profile
                        profileImg={member?.profileImg}
                        jobField={member.jobField}
                        nickname={member.nickname}
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

              {/* 게시글 내용 */}
              <div className="detail-content">
                {currentArticle.images?.length ? (
                  currentArticle.images.map((image) => (
                    <img key={image.id} src={image.imageUrl} alt={image.originImageName} />
                  ))
                ) : null}
                {/* HTML 태그를 렌더링 */}
                <div
                  dangerouslySetInnerHTML={{ __html: currentArticle.content }}
                  className="article-content"
                ></div>
              </div>

            {/* 댓글 목록 */}
            <CommentList articleId={articleId} />

            {/* 댓글 작성란 */}
            <CommentInput articleId={articleId} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
