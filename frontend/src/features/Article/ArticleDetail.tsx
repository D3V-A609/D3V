import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { fetchArticle } from "../../store/actions/articleActions";
import CommentInput from "../Comment/CommentInput"; // 재사용 가능한 댓글 입력 컴포넌트
import Profile from "../../components/Profile/Profile";
import dummyUsers from "../../constants/dummyUsers";
import CommentList from "../Comment/CommentList";
import { FaEye, FaComment } from "react-icons/fa6";

import "./ArticleDetail.css";

// 카테고리 영어 -> 한글 매핑
const categoryNameMap: Record<string, string> = {
  JOB_REVIEW: "합격 후기",
  QUESTION_REVIEW: "답변 첨삭",
  INFO_SHARING: "정보 공유",
  ETC: "기타",
};

interface ArticleDetailProps {
  articleId: number;
  onBackClick: () => void; // 목록으로 돌아가기 핸들러
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ articleId, onBackClick }) => {
  const dispatch = useAppDispatch();
  
  const { currentArticle, loading, error } = useAppSelector(
    (state) => state.articles || { currentArticle: null, loading: false, error: null}
    // 기본값으로 undefined 설정
  );

  // 게시글 상세 데이터 가져오기
  useEffect(() => {
    if (!currentArticle || currentArticle.id !== articleId) {
      dispatch(fetchArticle(articleId));
    }
  }, [dispatch, articleId, currentArticle]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // 작성자 정보 가져오기
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
              {/* 왼쪽 섹션: 프로필과 작성일 */}
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
                <span className="date">{currentArticle.updatedAt || "작성일 없음"}</span>
              </div>

              {/* 오른쪽 섹션: 조회수와 댓글 */}
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
            <p>{currentArticle.content}</p>
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