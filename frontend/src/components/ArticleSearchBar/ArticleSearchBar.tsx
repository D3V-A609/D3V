// src/components/ArticleSearchBar/ArticleSearchBar.tsx
import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi"; // 검색 아이콘 import
import "./ArticleSearchBar.css";

/**
 * ArticleSearchBar 컴포넌트의 props 인터페이스
 * @param onSearch 검색어 변경 시 호출될 콜백 함수
 * @param searchQuery 현재 검색어 상태
 */
interface ArticleSearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

/**
 * 자유게시판 검색창 컴포넌트
 */
const ArticleSearchBar: React.FC<ArticleSearchBarProps> = ({ onSearch, searchQuery }) => {
  const [inputValue, setInputValue] = useState("");

  // searchQuery prop이 변경될 때마다 입력값 업데이트
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  /**
   * 검색 실행 핸들러
   */
  const handleSearch = () => {
    onSearch(inputValue); // 부모 컴포넌트에 검색어 전달
  };

  /**
   * Enter 키 입력 시 검색 실행
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="article-search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="검색어를 입력해주세요"
        className="article-search-input"
      />
      <BiSearch 
        className="article-search-icon" 
        onClick={handleSearch} 
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default ArticleSearchBar;
