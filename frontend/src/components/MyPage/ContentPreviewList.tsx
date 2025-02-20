import React from "react";
import styles from "./ContentPreviewList.module.css";
import QuestionSkillTag from "../QuestionDetail/Question/QuestionSkillTag";
import { moveToArticleDetail, moveToQuestionDetail } from "../../utils/navigation";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { useNavigate } from "react-router-dom";

interface ContentPreviewProps {
  title: string;
  titleIcon?: JSX.Element;
  contents: string[] | myQuestion[] | ArticleComment[] | ArticleItem[] | Answer[] | Feedback[];
  handleMoreBtn?: (isSolved?: boolean) => void;
  className?: string;
  handleDetail: string;
}

const ContentPreviewList: React.FC<ContentPreviewProps> = ({title, titleIcon, contents, className, handleMoreBtn, handleDetail}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const filledContents = (contents.length < 5 && contents.length > 0)
  ? contents.concat(Array(5 - contents.length).fill({ content: " " })) // 빈 값 추가
  : contents;

  const isMoreBtnDisabled = contents.length <= 5 || !handleMoreBtn; // 더보기 버튼 비활성화 조건

  return (
      <div className={`${styles["content-section-container"]} ${className}`}>
        <div className={styles["content-header"]}>
          <div className={styles["content-title"]}>
            <span className={styles["content-title-icon"]}>{titleIcon}</span> 
            <span className={styles["content-title-text"]}>{title}</span>
          </div>
          <div className={`${styles["more-button"]} ${isMoreBtnDisabled ? styles["disabled-btn"] : ""}`} onClick={()=> handleMoreBtn?.()}>더보기</div>
        </div>

        <div className={styles["content-list"]}>
          { Array.isArray(filledContents) && filledContents.length>0 ? (
          filledContents.slice(0,5).map((content, index) => (
            <div key={index} 
            className={`${styles["content-item"]} ${
              index === 0
                ? styles["first-item"]
                : index === Math.min(filledContents.length, 5) - 1
                ? styles["last-item"]
                : styles["middle-item"]
            }`}
            onClick={() => {
              if(content !== null && typeof content === 'object'){
              if(handleDetail === 'answer-detail' && "questionId" in content) { moveToQuestionDetail(navigate, dispatch, content.questionId)}
              else if(handleDetail === 'answer-commu' && "questionId" in content) { moveToQuestionDetail(navigate, dispatch, content.questionId, true)}
              else if(handleDetail === 'article' && "articleId" in content) { moveToArticleDetail(navigate, content.articleId, '/my')}
              else if(handleDetail === 'article' && "id" in content) { moveToArticleDetail(navigate, content.id, '/my')}
              }
            }}
            >
              {typeof content !== "string" && "skillList" in content && content.skillList && (
                <div className={`${styles["icon-container"]} `}>
                  <QuestionSkillTag skill={content.skillList[0]} className="content-preview-skill-tag" />
                </div>
              )}

              <div className={styles["text-container"]}>
                {typeof content === "string" ? content : "title" in content ? content.title :  content.content}
              </div>
            </div> )
          )) : (
            <p> 아직 내 활동이 없어요! </p>
          )}
        </div>
    </div>
  );
};

export default ContentPreviewList;
