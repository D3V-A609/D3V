import React from 'react';
import { FcReadingEbook } from "react-icons/fc";

import styles from './SectionContainer.module.css'

interface SectionContainerProps {
  icon?: JSX.Element;
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ icon, title, children, className }) => {
  return (
    <div className={styles["section-container"]}>
      <div className={styles["section-title"]}>
        <span className={styles["section-title-icon"]}>{icon ? icon : <FcReadingEbook size={24}/>}</span>
        <span className={styles["section-title-text"]}>{title}</span>
      </div>
      <div className={`${styles["section-content"]} ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default SectionContainer;
