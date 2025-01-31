// components/SearchBar/SearchBar.tsx
import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchQuery }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="검색어를 입력해주세요"
        className="search-bar-input"
      />
      <BiSearch className="search-bar-icon" />
    </div>
  );
};

export default SearchBar;
