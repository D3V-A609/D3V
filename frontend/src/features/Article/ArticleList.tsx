// src/features/ArticleList/ArticleList.tsx
import React from "react";
import Pagination from "../../components/Pagination/Pagination";
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
  pagination?: Pagination;
  onPageChange(pageNumber: number): void;
  onSort(field: string): void;
  onArticleClick(articleId: number): void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  pagination,
  onPageChange,
  onSort,
  onArticleClick,
}) => {
  return (
    <div className="article-list">
      {articles.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>카테고리</th>
                <th>제목</th>
                <th onClick={() => onSort("view")}>조회 수</th>
                <th onClick={() => onSort("commentCount")}>댓글 수</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} onClick={() => onArticleClick(article.id)}>
                  <td>{categoryNameMap[article.name] || article.name}</td>
                  <td>{article.title}</td>
                  <td>{article.view}</td>
                  <td>{article.commentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {pagination && (
            <Pagination
              currentPage={pagination.currentPage - 1}  // 0-based로 변환
              totalPages={pagination.totalPages}
              first={pagination.currentPage === 1}
              last={pagination.currentPage === pagination.totalPages}
              onPageChange={(page) => onPageChange(page + 1)}  // 1-based로 변환하여 호출
            />
          )}
        </>
      ) : (
        <div className="no-articles-message">게시글이 없습니다.</div>
      )}
    </div>
  );
};

export default ArticleList;
