import React, { useEffect, useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks/useRedux";
import PageHeader from "../components/PageHeader/PageHeader";
import ArticleList from "../features/Article/ArticleList";
import ArticleDetail from "../features/Article/ArticleDetail";
import WriteArticle from "../features/Article/WriteArticle";
import SearchBar from "../components/SearchBar/SearchBar";
import "./BoardPage.css";
import { BsChatSquareText } from "react-icons/bs";
import { fetchArticles } from "../store/actions/articleActions";
import { useLocation } from "react-router-dom";

const categoryMap: Record<string, string> = {
  전체: "",
  "합격 후기": "JOB_REVIEW",
  "답변 첨삭": "QUESTION_REVIEW",
  "정보 공유": "INFO_SHARING",
  기타: "ETC",
};

const BoardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.user);
  const [params, setParams] = useState({
    category: "전체",
    searchQuery: "",
    sortField: "LATEST",
    sortOrder: 'DESC' as 'ASC' | 'DESC',
    page: 1,
    size: 15
  });

  const location = useLocation();
  const state = location.state as {selectedArticleId?: number; currentView?: 'detail'};

  const [currentView, setCurrentView] = useState<"list" | "detail" | "create" | "edit">(state?.currentView || "list");
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(state?.selectedArticleId || null);

  const fetchArticlesData = useCallback(() => {
    const apiCategory = categoryMap[params.category];
    dispatch(fetchArticles({ 
      category: apiCategory, 
      keyword: params.searchQuery, 
      sort: params.sortField, 
      order: params.sortOrder,
      page: params.page,
      size: params.size
    }));
  }, [dispatch, params]);
  
  useEffect(() => {
    fetchArticlesData();
  }, [fetchArticlesData]);

  // detail 페이지에서 뒤로가기 시 list로 currentView 수정정
  useEffect(() => {
    const handlePopState = () => {
      if (currentView === "detail") {
        setCurrentView("list"); // ✅ currentView가 detail이면 list로 변경
        window.history.pushState(null, "", location.pathname); // ✅ 뒤로 가기 무력화 (현재 페이지 유지)
      } else {
        window.history.back(); // ✅ currentView가 list이면 정상적인 뒤로 가기 수행
      }
    };
  
    // ✅ "뒤로 가기"를 막기 위해 현재 상태를 저장
    window.history.pushState(null, "", location.pathname);
    window.addEventListener("popstate", handlePopState);
  
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentView, location.pathname]); // ✅ location.pathname 추가

  const handleParamChange = (newParams: Partial<typeof params>) => {
    setParams(prev => {
      const updatedParams = { ...prev, ...newParams, page: 1 };
      fetchArticlesData();
      return updatedParams;
    });
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
            params={params}
            onParamChange={handleParamChange}
            onArticleClick={handleArticleClick}
          />
        </>
      )}

      {currentView === "detail" && selectedArticleId && (
        <ArticleDetail
          articleId={selectedArticleId}
          onBackClick={handleBackToList}
          userInfo={users}
        />
      )}

      {currentView === "create" && (
        <WriteArticle onCancel={() => setCurrentView("list")} />
      )}
    </div>
  );
};

export default BoardPage;