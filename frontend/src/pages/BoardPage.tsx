import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/useRedux";
import { fetchArticles } from "../store/actions/articleActions";
import PageHeader from "../components/PageHeader/PageHeader";
import ArticleList from "../features/Article/ArticleList";
import ArticleDetail from "../features/Article/ArticleDetail";
import WriteArticle from "../features/Article/WriteArticle";
import SearchBar from "../components/SearchBar/SearchBar";
import "./BoardPage.css";
import { BsChatSquareText } from "react-icons/bs";

const categoryMap: Record<string, string> = {
  전체: "",
  "합격 후기": "JOB_REVIEW",
  "답변 첨삭": "QUESTION_REVIEW",
  "정보 공유": "INFO_SHARING",
  기타: "ETC",
};

const BoardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, error, pagination } = useAppSelector(
    (state) => state.articles || { articles: [], error: null, pagination: undefined }
  );
  const [params, setParams] = useState({
    category: "전체",
    searchQuery: "",
    sortField: "LATEST",
    sortOrder: 'DESC' as 'ASC' | 'DESC',
    page: 1,
    size: 15
  });
  const [currentView, setCurrentView] = useState<"list" | "detail" | "create" | "edit">("list");
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  const fetchArticlesData = useCallback(() => {
    if (currentView === "list") {
      const apiCategory = categoryMap[params.category];
      dispatch(fetchArticles({ 
        category: apiCategory, 
        keyword: params.searchQuery, 
        sort: params.sortField, 
        order: params.sortOrder,
        page: params.page,
        size: params.size
      }));
    }
  }, [dispatch, currentView, params.category, params.searchQuery, params.sortField, params.sortOrder, params.page, params.size]);

  useEffect(() => {
    fetchArticlesData();
  }, [fetchArticlesData]);

  const handleParamChange = (newParams: Partial<typeof params>) => {
    setParams(prev => ({ ...prev, ...newParams, page: 1 }));
  };

  const handleWriteClick = () => setCurrentView("create");

  const handleArticleClick = (articleId: number) => {
    setSelectedArticleId(articleId);
    setCurrentView("detail");
  };

  const handleBackToList = useCallback((isDeleted: boolean = false) => {
    setCurrentView("list");
    if (isDeleted) {
      fetchArticlesData();
    }
  }, [fetchArticlesData]);

  if (error) return <div>Error occurred: {error}</div>;

  return (
    <div className="board-page">
      <PageHeader
        title="자유 게시판"
        description="다양한 의견과 글을 자유롭게 게시하고 공유해주세요!"
        icon={<BsChatSquareText />}
        iconStyle="pink-chat-icon"
      />

      {currentView === "list" && (
        <>
          <div className="category-filter">
            <div className="category-buttons">
              {Object.keys(categoryMap).map((cat) => (
                <button
                  key={cat}
                  className={params.category === cat ? "active" : ""}
                  onClick={() => handleParamChange({ category: cat })}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="write-button" onClick={handleWriteClick}>
              글쓰기
            </button>
          </div>

          <SearchBar 
            searchQuery={params.searchQuery} 
            onSearch={(query) => handleParamChange({ searchQuery: query })} 
          />

          <ArticleList
            articles={articles}
            pagination={pagination}
            onPageChange={(pageNumber) => handleParamChange({ page: pageNumber - 1 })}
            onSort={(field, order) => handleParamChange({ sortField: field, sortOrder: order })}
            onArticleClick={handleArticleClick}
            currentSort={{ field: params.sortField, order: params.sortOrder }}
          />
        </>
      )}

      {currentView === "detail" && selectedArticleId && (
        <ArticleDetail
          articleId={selectedArticleId}
          onBackClick={handleBackToList}
        />
      )}

      {currentView === "create" && (
        <WriteArticle onCancel={() => setCurrentView("list")} />
      )}
    </div>
  );
};

export default BoardPage;