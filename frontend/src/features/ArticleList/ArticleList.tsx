// src/features/ArticleList/ArticleList.tsx
import React from "react";
import "./ArticleList.css";

interface Article {
  id: number;
  name: string;
  title: string;
  view: number;
  commentCount: number;
}

interface Pagination {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

interface ArticleListProps {
  articles: Article[];
  pagination?: Pagination; // Pagination 정보 (선택 사항)
  onPageChange(pageNumber: number): void; // 페이지 변경 핸들러
  onSort(field: string): void; // 정렬 변경 핸들러
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  pagination,
  onPageChange,
  onSort,
}) => {
  /**
   * 페이지네이션 버튼 렌더링
   */
  const renderPagination = () => {
    if (!pagination) return null;

    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={pagination.currentPage === i ? "active" : ""}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="article-list">
      <table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제목</th>
            <th onClick={() => onSort("view")}>
              조회 수
              <span className="sort-icon">▼</span>
            </th>
            <th onClick={() => onSort("commentCount")}>
              댓글 수
              <span className="sort-icon">▼</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.name}</td>
              <td>{article.title}</td>
              <td>{article.view}</td>
              <td>{article.commentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="pagination">{renderPagination()}</div>
    </div>
  );
};

export default ArticleList;