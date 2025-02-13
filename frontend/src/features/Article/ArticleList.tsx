import React, { useMemo } from "react";
import Pagination from "../../components/Pagination/Pagination";
import "./ArticleList.css";

const categoryNameMap: Record<string, string> = {
  JOB_REVIEW: "합격 후기",
  QUESTION_REVIEW: "답변 첨삭",
  INFO_SHARING: "정보 공유",
  ETC: "기타",
};

interface Article {
  id: number;
  name: string;
  title: string;
  view: number;
  commentCount: number;
  createdAt: string;
}

interface Pagination {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

interface ArticleListProps {
  articles: Article[];
  pagination?: Pagination;
  onPageChange(pageNumber: number): void;
  onSort(field: string, order: 'asc' | 'desc'): void;
  onArticleClick(articleId: number): void;
  currentSort: {
    field: string;
    order: 'asc' | 'desc';
  };
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  pagination,
  onPageChange,
  onSort,
  onArticleClick,
  currentSort,
}) => {
  const handleSort = (field: string) => {
    const newOrder = currentSort.field === field && currentSort.order === 'desc' ? 'asc' : 'desc';
    onSort(field, newOrder);
  };

  const renderSortIcon = (field: string) => {
    if (currentSort.field !== field) return '▽';
    return currentSort.order === 'asc' ? '▲' : '▼';
  };

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const modifier = currentSort.order === 'asc' ? 1 : -1;
      if (currentSort.field === 'LATEST') {
        return modifier * (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (currentSort.field === 'COMMENT') {
        return modifier * (b.commentCount - a.commentCount);
      } else if (currentSort.field === 'VIEW') {
        return modifier * (b.view - a.view);
      }
      return 0;
    });
  }, [articles, currentSort]);

  return (
    <div className="article-list">
      <table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제목</th>
            <th onClick={() => handleSort('LATEST')} style={{ cursor: 'pointer' }}>
              작성일 {renderSortIcon('LATEST')}
            </th>
            <th onClick={() => handleSort('COMMENT')} style={{ cursor: 'pointer' }}>
              댓글 수 {renderSortIcon('COMMENT')}
            </th>
            <th onClick={() => handleSort('VIEW')} style={{ cursor: 'pointer' }}>
              조회 수 {renderSortIcon('VIEW')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedArticles.map((article) => (
            <tr key={article.id} onClick={() => onArticleClick(article.id)}>
              <td>{categoryNameMap[article.name] || article.name}</td>
              <td>{article.title}</td>
              <td>{new Date(article.createdAt).toLocaleDateString()}</td>
              <td>{article.commentCount}</td>
              <td>{article.view}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <Pagination
          currentPage={pagination.currentPage - 1}
          totalPages={pagination.totalPages}
          first={pagination.currentPage === 1}
          last={pagination.currentPage === pagination.totalPages}
          onPageChange={(page) => onPageChange(page + 1)}
        />
      )}
    </div>
  );
};

export default ArticleList;