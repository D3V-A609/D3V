import React from "react";
import Pagination from "../../components/Pagination/Pagination";
import "./ArticleList.css";

const categoryNameMap: Record<string, string> = {
  JOB_REVIEW: "합격 후기",
  QUESTION_REVIEW: "답변 첨삭",
  INFO_SHARING: "정보 공유",
  ETC: "기타",
};

interface ArticleListProps {
  articles: Article[];
  users: Record<number, User>;
  pagination: ArticlePagination;
  params: {
    category: string;
    searchQuery: string;
    sortField: string;
    sortOrder: 'ASC' | 'DESC';
    page: number;
    size: number;
  };
  error: string | null;
  onParamChange: (newParams: Partial<ArticleListProps['params']>) => void;
  onArticleClick: (articleId: number) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  users,
  pagination,
  params,
  error,
  onParamChange,
  onArticleClick,
}) => {
  const handleSort = (field: string) => {
    const newOrder = params.sortField === field && params.sortOrder === 'DESC' ? 'ASC' : 'DESC';
    onParamChange({ sortField: field, sortOrder: newOrder });
  };

  const renderSortIcon = (field: string) => {
    if (params.sortField !== field) return '▽';
    return params.sortOrder === 'ASC' ? '▲' : '▼';
  };

  if (error) return <div>Error occurred: {error}</div>;

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
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} onClick={() => onArticleClick(article.id)}>
              <td>{categoryNameMap[article.name] || article.name}</td>
              <td>{article.title}</td>
              <td>{new Date(article.createdAt).toLocaleDateString()}</td>
              <td>{article.commentCount}</td>
              <td>{article.view}</td>
              <td className="author-cell">
                {users[article.memberId] ? (
                  <>
                    {users[article.memberId].profileImg ? (
                      <img 
                        src={users[article.memberId].profileImg} 
                        alt={users[article.memberId].nickname} 
                        className="author-profile-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="article-avatar-fallback">
                        {users[article.memberId].nickname?.[0]?.toUpperCase() ?? "D"}
                      </div>
                    )}
                    <span title={users[article.memberId].nickname}>
                      {users[article.memberId].nickname || '알 수 없음'}
                    </span>
                  </>
                ) : (
                  <span>알 수 없음</span>
                )}
              </td>
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
          onPageChange={(page) => onParamChange({ page: page + 1 })}
        />
      )}
    </div>
  );
};

export default ArticleList;
