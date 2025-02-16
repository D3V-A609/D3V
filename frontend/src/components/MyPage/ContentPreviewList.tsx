import React from "react";
import styles from "./ContentPreviewList.module.css";
import QuestionSkillTag from "../QuestionDetail/Question/QuestionSkillTag";

interface ContentPreviewProps {
  title: string;
  titleIcon?: JSX.Element;
  contents: string[] | myQuestion[] | ArticleComment[] | ArticleItem[] | Answer[] | Feedback[];
  handleMoreBtn?: () => void;
  handleDetailContent?: (id: number) => void
  className?: string;
}

const ContentPreviewList: React.FC<ContentPreviewProps> = ({title, titleIcon, contents, className}) => {

  const filledContents = (contents.length < 5 && contents.length > 0)
  ? contents.concat(Array(5 - contents.length).fill({ content: " " })) // ✅ 빈 값 추가
  : contents;

  return (
      <div className={`${styles["content-section-container"]} ${className}`}>
        <div className={styles["content-header"]}>
          <div className={styles["content-title"]}>
            <span className={styles["content-title-icon"]}>{titleIcon}</span> 
            <span className={styles["content-title-text"]}>{title}</span>
          </div>
          <div className={styles["more-button"]}>더보기</div>
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
            // onClick={() => handleDetailContent(index)}
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
