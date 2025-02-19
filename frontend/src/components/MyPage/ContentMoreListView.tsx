import React, { useCallback, useEffect } from "react";
import styles from  "./ContentMoreListView.module.css";
import { moveToArticleDetail, moveToQuestionDetail } from "../../utils/navigation";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { useNavigate } from "react-router-dom";

interface ContentMoreProps {
  title: string;
  titleIcon?: JSX.Element;
  contents: string[] | myQuestion[] | ArticleComment[] | ArticleItem[] | Answer[] | Feedback[];
  onClose: () => void;
  handleDetail: string
}

const ContentMoreListView: React.FC<ContentMoreProps> = ({ contents, onClose, title, titleIcon, handleDetail }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ✅ ESC 키를 눌러도 모달이 닫히도록 설정
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );
  // MyPage 스크롤 방지 (모달 내부는 스크롤 가능)
  const preventScroll = useCallback((event: Event) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    // 모달이 열리면 MyPage의 스크롤 차단
    document.addEventListener("wheel", preventScroll, { passive: false }); // 마우스 휠 방지
    document.addEventListener("keydown", handleKeyDown, true); // ESC 키 감지

    return () => {
      // 모달이 닫히면 MyPage의 동작 다시 활성화
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [handleKeyDown, preventScroll]);

  
  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
        <button className={styles["modal-close-btn"]} onClick={onClose}>×</button>
        <div className={styles["content-header"]}>
          <div className={styles["content-title"]}>
            <span className={styles["content-title-icon"]}>{titleIcon}</span> 
            <span className={styles["content-title-text"]}>{title}</span>
          </div>
        </div>

        <div className={styles["content-list"]}>
          { Array.isArray(contents) && contents.length>0 ? (
          contents.map((content, index) => (
            <div key={index} 
            className={`${styles["content-item"]} ${
              index === 0
                ? styles["first-item"]
                : index === contents.length - 1
                ? styles["last-item"]
                : styles["middle-item"]
            }`}
            onClick={() => {
              if(content !== null && typeof content === 'object'){
                if("questionId" in content && handleDetail==='answer-commu'){moveToQuestionDetail(navigate, dispatch, content.questionId, true)}
                else if("questionId" in content && handleDetail==='answer'){moveToQuestionDetail(navigate, dispatch, content.questionId, false)}
                else if("articleId" in content && handleDetail === 'article') { moveToArticleDetail(navigate, content.articleId)}
                else if(handleDetail === 'article' && "id" in content) { moveToArticleDetail(navigate, content.id)}
              }
            }}
            >
              <div className={styles["text-container"]}>
                {typeof content === "string" ? content : "title" in content ? content.title :  content.content}
              </div>
            </div> )
          )) : (
            <p className={styles["no-answer"]}> 아직 내 활동이 없어요! </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentMoreListView;
