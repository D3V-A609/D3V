import React, { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { fetchArticles } from "../../store/actions/articleActions";
import { fetchMultipleUserInfo } from "../../store/actions/userActions";
import Pagination from "../../components/Pagination/Pagination";
import "./ArticleList.css";

const categoryNameMap: Record<string, string> = {
  JOB_REVIEW: "합격 후기",
  QUESTION_REVIEW: "답변 첨삭",
  INFO_SHARING: "정보 공유",
  ETC: "기타",
};

interface ArticleListProps {
  params: {
    category: string;
    searchQuery: string;
    sortField: string;
    sortOrder: 'ASC' | 'DESC';
    page: number;
    size: number;
  };
  onParamChange: (newParams: Partial<ArticleListProps['params']>) => void;
  onArticleClick: (articleId: number) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  params,
  onParamChange,
  onArticleClick,
}) => {
  const dispatch = useAppDispatch();
  const { articles, error, pagination } = useAppSelector(
    (state) => state.articles || { articles: [], error: null, pagination: undefined }
  );
  const { users } = useAppSelector((state) => state.user);

  const fetchArticlesData = useCallback(() => {
    const apiCategory = categoryNameMap[params.category] || "";
    dispatch(fetchArticles({ 
      category: apiCategory, 
      keyword: params.searchQuery, 
      sort: params.sortField, 
      order: params.sortOrder,
      page: params.page,
      size: params.size
    })).then((action) => {
      if (fetchArticles.fulfilled.match(action)) {
        const userIds = [...new Set(action.payload.data.map((article: Article) => article.memberId))] as number[];
        dispatch(fetchMultipleUserInfo(userIds));
      }
    });
  }, [dispatch, params]);

  useEffect(() => {
    fetchArticlesData();
  }, [fetchArticlesData, params]);
  
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
                {users[article.memberId] && (
                  <>
                    <img 
                      src={users[article.memberId].profileImg || '/default-profile.png'} 
                      alt={users[article.memberId].nickname} 
                      className="author-profile-image"
                    />
                    <span title={users[article.memberId].nickname}>
                      {users[article.memberId].nickname || '알 수 없음'}
                    </span>
                  </>
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