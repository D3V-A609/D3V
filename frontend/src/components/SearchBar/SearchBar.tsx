// components/SearchBar/SearchBar.tsx
import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi"; // 검색 아이콘 import
import "./SearchBar.css";

/**
 * SearchBar 컴포넌트의 props 인터페이스
 * @param onSearch 검색어 변경 시 호출될 콜백 함수
 * @param searchQuery 현재 검색어 상태
 */
interface SearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

/**
 * 검색바 컴포넌트
 * 검색어 입력 및 검색 기능을 제공
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchQuery }) => {
  // 입력값 상태 관리
  const [inputValue, setInputValue] = useState("");

  // searchQuery prop이 변경될 때마다 입력값 업데이트
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  /**
   * 검색 실행 핸들러
   * 현재 입력값으로 검색 수행
   */
  const handleSearch = () => {
    onSearch(inputValue);
  };

  /**
   * 키 입력 이벤트 핸들러
   * Enter 키 입력 시 검색 실행
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      {/* 검색어 입력 필드 */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="검색어를 입력해주세요"
        className="search-bar-input"
      />
      {/* 검색 아이콘 */}
      <BiSearch className="search-bar-icon" />
    </div>
  );
};

export default SearchBar;