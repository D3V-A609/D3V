import React from "react";
import styles from "./ContentPreviewList.module.css";

// const contents = [
//   "선언적 UI 부분이 좀 더 자세히 설명되었으면 좋겠어요. 이 부분이 실제로 어떤 장점이 있는지 궁금합니다.",
//   "가상 DOM의 개념을 정말 깔끔하게 설명해주셨네요! 처음 배우는 사람도 이해하기 쉬울 것 같아요.",
//   "좋은 설명 감사합니다!",
//   "선점형 스케줄링 방식에 대해 더 자세히 설명해주시면 좋을 것 같아요!",
//   "프로세스와 스레드의 차이에 대해 정말 잘 정리해주신 것 같습니다! 다만, 둘의 공통점에 대한 내용이 더 추가되면 좋을 것 같아요. 어떻게 생각하시나요? 동의하시나요? 동의하신다면 끄덕여ㅋㅋㅋㅋ"
// ];

interface ContentPreviewProps {
  title: string;
  titleIcon: JSX.Element;
  contents: string[] | Question[] | Answer[];
  handleMoreBtn: () => void;
  handleDetailContent: (id: number) => void
  className?: string;
}

// const ContentPreviewList: React.FC = () => {
  const ContentPreviewList: React.FC<ContentPreviewProps> = ({title, titleIcon, contents, handleMoreBtn, handleDetailContent, className}) => {
  return (
    // <div className="content-section-container">
      <div className={`${styles["content-section-container"]} ${className}`}>
      <div className={styles["content-header"]}>
        <div className={styles["content-title"]}>
          {/* <span className="content-title-icon">💬</span>  */}
          <span className={styles["content-title-icon"]}>{titleIcon}</span> 
          {/* <span className="content-title-text">댓글</span> */}
          <span className={styles["content-title-text"]}>{title}</span>
        </div>
        {/* <div className="more-button">더보기</div> */}
        <div className={styles["more-button"]} onClick={handleMoreBtn}>더보기</div>
      </div>

      <div className="content-list">
        {contents.map((content, index) => (
          <div key={index} 
          className={`content-item ${
            index === 0 ? "first-item" : index === contents.length - 1 ? "last-item" : "middle-item"
          }`}
          onClick={() => handleDetailContent(index)}
          >
            {typeof content === "string"? content: content.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPreviewList;
