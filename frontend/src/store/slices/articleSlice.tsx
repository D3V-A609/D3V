// src/store/slices/articleSlice.tsx
import { createSlice } from "@reduxjs/toolkit";
import { fetchArticles } from "../actions/articleActions";

export interface Article {
  id: number;
  categoryId: number;
  name: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  view: number;
  commentCount: number;
}

export interface Pagination {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

export interface ArticleState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  pagination: Pagination; // Pagination 타입 명시
}

const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: null,
  pagination: {
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
  },
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.data || [];
        state.pagination = action.payload.pagable || initialState.pagination; // 기본값 제공
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch articles.";
      });
  },
});

export default articleSlice.reducer;