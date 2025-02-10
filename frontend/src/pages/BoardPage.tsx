import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/useRedux";
import { fetchArticles } from "../store/actions/articleActions";
import PageHeader from "../components/PageHeader/PageHeader";
import ArticleList from "../features/ArticleList/ArticleList"; 
import ArticleSearchBar from "../components/ArticleSearchBar/ArticleSearchBar";
import "./BoardPage.css";
import { BsChatSquareText } from 'react-icons/bs';

const BoardPage = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error, pagination } = useAppSelector(
    (state) => state.articles || { articles: [], loading: false, error: null }
  );

  const [category, setCategory] = useState<string>(""); 
  const [searchQuery, setSearchQuery] = useState<string>(""); 

  useEffect(() => {
    dispatch(fetchArticles({ category, keyword: searchQuery }));
  }, [dispatch, category, searchQuery]);

  const handleCategoryChange = (newCategory: string) => setCategory(newCategory);
  const handleSearch = (query: string) => setSearchQuery(query);
  const handleSort = (field: string) => {
    dispatch(fetchArticles({ category, keyword: searchQuery }));
  };

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

      <div className="category-filter">
        <div className="category-buttons">
          {["전체", "합격 후기", "답변 첨삭", "정보 공유", "기타"].map((cat) => (
            <button 
              key={cat} 
              className={category === cat ? "active" : ""}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="write-button">글쓰기</button>
      </div>

      <div className="sort-buttons">
        {["최신순", "조회순", "댓글순"].map((sort) => (
          <button key={sort} onClick={() => handleSort(sort)}>{sort}</button>
        ))}
      </div>
      <div className="search-bar-container">
        <ArticleSearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      </div>

      <ArticleList 
        articles={articles} 
        pagination={pagination}
        onPageChange={(pageNumber) =>
          dispatch(fetchArticles({ category, keyword: searchQuery, page: pageNumber }))
        }
        onSort={handleSort}
      />

      
    </div>
  );
};

export default BoardPage;
