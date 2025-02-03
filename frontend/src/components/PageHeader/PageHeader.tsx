// components/PageHeader/PageHeader.tsx
import "./PageHeader.css";
import { ReactNode } from 'react';

/**
 * 페이지 헤더 컴포넌트의 props 인터페이스
 * @interface PageHeaderProps
 * @property {string} title - 페이지의 제목
 * @property {string} [description] - 페이지의 설명 (선택사항)
 * @property {ReactNode} [icon] - 헤더에 표시될 아이콘 (선택사항)
 * @property {string} [iconStyle] - 아이콘에 적용될 스타일 클래스명 (선택사항)
 */
interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  iconStyle?: string;
}

/**
 * 페이지 헤더 컴포넌트
 * 페이지의 제목, 설명, 아이콘을 포함하는 헤더 섹션
 * 
 * @param {PageHeaderProps} props - 컴포넌트 props
 * @returns {JSX.Element} 페이지 헤더 컴포넌트
 */
const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  icon,
  iconStyle 
}) => {
  return (
    <div className="page-header">
      {/* 설명이 있는 경우에만 description 섹션 렌더링 */}
      {description && (
        <p className="header-description">
          {/* 아이콘이 있는 경우에만 아이콘 렌더링 */}
          {icon && <span className={`header-icon ${iconStyle || ''}`}>{icon}</span>}
          {description}
        </p>
      )}
      <h1 className="header-title">{title}</h1>
    </div>
  );
};

export default PageHeader;
