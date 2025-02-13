import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { fetchArticle } from "../../store/actions/articleActions";
import CommentInput from "../Comment/CommentInput";
import Profile from "../../components/Profile/Profile";
import dummyUsers from "../../constants/dummyUsers";
import CommentList from "../Comment/CommentList";
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

  const { currentArticle, loading, error } = useAppSelector(
    (state) => state.articles || { currentArticle: null, loading: false, error: null }
  );

  useEffect(() => {
    if (!currentArticle || currentArticle.id !== articleId) {
      dispatch(fetchArticle(articleId));
    }
  }, [dispatch, articleId, currentArticle]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const member = dummyUsers.find(user => user.memberId === currentArticle?.memberId);

  return (
    <div className="article-detail">
      <div className="detail-header">
        <button className="back-button" onClick={onBackClick}>
          목록
        </button>
      </div>

      {currentArticle && (
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
    </div>
  );
};

export default ArticleDetail;