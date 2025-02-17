import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks/useRedux";
import { fetchMultipleUserInfo } from "../../store/actions/userActions";
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
  memberId: number;
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
  onSort(field: string, order: 'ASC' | 'DESC'): void;
  onArticleClick(articleId: number): void;
  currentSort: {
    field: string;
    order: 'ASC' | 'DESC';
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
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);

  useEffect(() => {
    if (articles.length > 0) {
      const uniqueMemberIds = [...new Set(articles.map(article => article.memberId))];
      dispatch(fetchMultipleUserInfo(uniqueMemberIds));
    }
  }, [articles, dispatch]);

  const handleSort = (field: string) => {
    const newOrder = currentSort.field === field && currentSort.order === 'DESC' ? 'ASC' : 'DESC';
    onSort(field, newOrder);
  };

  const renderSortIcon = (field: string) => {
    if (currentSort.field !== field) return '▽';
    return currentSort.order === 'ASC' ? '▲' : '▼';
  };

  

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
          {articles.map((article) => (
            <tr key={article.id} onClick={() => onArticleClick(article.id)}>
              <td>{categoryNameMap[article.name] || article.name}</td>
              <td>{article.title}</td>
              <td>{users[article.memberId]?.nickname || '알 수 없음'}</td>
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