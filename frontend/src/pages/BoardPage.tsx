import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/useRedux";
import { fetchArticles, fetchArticle } from "../store/actions/articleActions";
import { updateArticleInList } from "../store/slices/articleSlice";
import PageHeader from "../components/PageHeader/PageHeader";
import ArticleList from "../features/Article/ArticleList";
import ArticleDetail from "../features/Article/ArticleDetail";
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
  const { articles, loading, error, pagination } = useAppSelector(
    (state) => state.articles || { articles: [], loading: false, error: null, pagination: undefined }
  );
  const [category, setCategory] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("LATEST");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentView, setCurrentView] = useState<"list" | "detail" | "create" | "edit">("list");
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  useEffect(() => {
    if (currentView === "list") {
      const apiCategory = categoryMap[category];
      dispatch(fetchArticles({ category: apiCategory, keyword: searchQuery, sort: sortField, order: sortOrder }));
    }
  }, [dispatch, category, searchQuery, sortField, sortOrder, currentView]);

  const handleCategoryChange = (newCategory: string) => setCategory(newCategory);
  const handleSearch = (query: string) => setSearchQuery(query);
  const handleSort = (field: string, order: 'asc' | 'desc') => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleWriteClick = () => setCurrentView("create");
  const handleArticleClick = (articleId: number) => {
    setSelectedArticleId(articleId);
    setCurrentView("detail");
    dispatch(fetchArticle(articleId)).then((action) => {
      if (fetchArticle.fulfilled.match(action)) {
        dispatch(updateArticleInList(action.payload));
      }
    });
  };
  const handleBackToList = () => setCurrentView("list");

  if (loading) return <div>Loading...</div>;
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
                  className={category === cat ? "active" : ""}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button className="write-button" onClick={handleWriteClick}>
              글쓰기
            </button>
          </div>

          <div className="filter-and-search">
            <div className="sort-buttons">
              {[
                { field: "LATEST", label: "최신순" },
                { field: "VIEW", label: "조회순" },
                { field: "COMMENT", label: "댓글순" }
              ].map(({ field, label }) => (
                <button
                  key={field}
                  className={`sort-button ${sortField === field ? "active" : ""}`}
                  onClick={() => handleSort(field, sortField === field && sortOrder === 'desc' ? 'asc' : 'desc')}
                >
                  {label}
                </button>
              ))}
            </div>
            <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
          </div>

          <ArticleList
            articles={articles}
            pagination={pagination}
            onPageChange={(pageNumber) =>
              dispatch(fetchArticles({ category: categoryMap[category], keyword: searchQuery, sort: sortField, order: sortOrder, page: pageNumber }))
            }
            onSort={handleSort}
            onArticleClick={handleArticleClick}
            currentSort={{ field: sortField, order: sortOrder }}
          />
        </>
      )}

      {currentView === "detail" && selectedArticleId && (
        <ArticleDetail
          articleId={selectedArticleId}
          onBackClick={handleBackToList}
        />
      )}
    </div>
  );
};

export default BoardPage;