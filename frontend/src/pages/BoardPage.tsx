// src/pages/BoardPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/useRedux";
import { fetchArticles } from "../store/actions/articleActions";
import PageHeader from "../components/PageHeader/PageHeader";
import ArticleList from "../features/Article/ArticleList";
import ArticleDetail from "../features/Article/ArticleDetail";
// import ArticleForm from "../features/Article/ArticleForm";
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

const BoardPage = () => {
  const dispatch = useAppDispatch();
   // Redux 상태 가져오기
   const { articles, loading, error, pagination } = useAppSelector(
    (state) => state.articles || { articles: [], loading: false, error: null, pagination: undefined }
    // 기본값으로 undefined 설정
  );
  const [category, setCategory] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("LATEST");
  const [currentView, setCurrentView] = useState<"list" | "detail" | "create" | "edit">("list");
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  useEffect(() => {
    if (currentView === "list") {
      const apiCategory = categoryMap[category];
      dispatch(fetchArticles({ category: apiCategory, keyword: searchQuery, sort: sortField }));
    }
  }, [dispatch, category, searchQuery, sortField, currentView]);

  const handleCategoryChange = (newCategory: string) => setCategory(newCategory);
  const handleSearch = (query: string) => setSearchQuery(query);
  const handleSort = (field: string) => setSortField(field);

  const handleWriteClick = () => setCurrentView("create");
  const handleArticleClick = (articleId: number) => {
    setSelectedArticleId(articleId);
    setCurrentView("detail");
  };
  // const handleEditClick = () => setCurrentView("edit");
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

      {/* 목록 조회 */}
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
              {["LATEST", "VIEW", "COMMENT"].map((sort) => (
                <button
                  key={sort}
                  className={`sort-button ${sortField === sort ? "active" : ""}`}
                  onClick={() => handleSort(sort)}
                >
                  {sort === "LATEST" ? "· 최신순" : sort === "VIEW" ? "· 조회순" : "· 댓글순"}
                </button>
              ))}
            </div>
            <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
          </div>

          <ArticleList
            articles={articles}
            pagination={pagination}
            onPageChange={(pageNumber) =>
              dispatch(fetchArticles({ category: categoryMap[category], keyword: searchQuery, page: pageNumber }))
            }
            onSort={handleSort}
            onArticleClick={handleArticleClick}
          />
        </>
      )}

      {/* 상세 조회 */}
      {currentView === "detail" && selectedArticleId && (
        <ArticleDetail
          articleId={selectedArticleId}
          // onEditClick={handleEditClick}
          onBackClick={handleBackToList}
        />
      )}

      {/* 게시글 작성 및 수정 *
      {(currentView === "create" || currentView === "edit") && (
        <ArticleForm
          mode={currentView}
          articleId={currentView === "edit" ? selectedArticleId : undefined}
          onSubmitSuccess={handleBackToList}
          onCancelClick={handleBackToList}
        />
      )} */}
    </div>
  );
};

export default BoardPage;