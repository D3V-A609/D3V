// src/features/ArticleList/ArticleList.tsx
import React from "react";
import "./ArticleList.css";

// 카테고리 영어 -> 한글 매핑
const categoryNameMap: Record<string, string> = {
  JOB_REVIEW: "합격 후기",
  QUESTION_REVIEW: "답변 첨삭",
  INFO_SHARING: "정보 공유",
  ETC: "기타",
};

interface Article {
  id: number;
  name: string; // 영어 카테고리 이름 (예: JOB_REVIEW)
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
   * 페이지네이션 번호 생성 로직
   */
  const getPageNumbers = () => {
    if (!pagination) return [];

    const pageNumbers = [];
    const currentGroup = Math.ceil(pagination.currentPage / 5);
    const lastGroup = Math.ceil(pagination.totalPages / 5);
    const start = (currentGroup - 1) * 5 + 1;
    const end = Math.min(currentGroup * 5, pagination.totalPages);

    if (currentGroup === 1) {
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      if (pagination.totalPages > 5) {
        pageNumbers.push('...');
        pageNumbers.push(pagination.totalPages);
      }
    } else if (currentGroup === lastGroup) {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(pagination.totalPages);
    }

    return pageNumbers;
  };

  /**
   * 페이지네이션 렌더링
   */
  const renderPagination = () => {
    if (!pagination) return null;

    return (
      <div className="pagination">
        <button
          onClick={() => onPageChange(Math.max(pagination.currentPage - 1, 1))}
          disabled={pagination.currentPage === 1}
          className="arrow-button"
        >
          &lt;
        </button>
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="ellipsis">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={pagination.currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          )
        ))}
        <button
          onClick={() => onPageChange(Math.min(pagination.currentPage + 1, pagination.totalPages))}
          disabled={pagination.currentPage === pagination.totalPages}
          className="arrow-button"
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="article-list">
      {articles.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>카테고리</th>
                <th>제목</th>
                <th onClick={() => onSort("view")}>
                  조회 수
                </th>
                <th onClick={() => onSort("commentCount")}>
                  댓글 수
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  {/* 카테고리 영어 -> 한글 변환 */}
                  <td>{categoryNameMap[article.name] || article.name}</td>
                  <td>{article.title}</td>
                  <td>{article.view}</td>
                  <td>{article.commentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 */}
          {renderPagination()}
        </>
      ) : (
        <div className="no-articles-message">
          게시글이 없습니다.
        </div>
      )}
    </div>
  );
};

export default ArticleList;