// src/store/slices/articleSlice.tsx
import { createSlice } from "@reduxjs/toolkit";
import { fetchArticles, fetchArticle } from "../actions/articleActions";

export interface Article {
  id: number;
  categoryId: number;
  memberId: number;
  name: string;
  title: string;
  content: string;
  images?: { id: number; originImageName: string; imageUrl: string }[]; // images 속성 추가
  createdAt: string | null;
  updatedAt: string | null;
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
  currentArticle: Article | null; // 현재 게시글 상세 정보
  loading: boolean;
  error: string | null;
  pagination: Pagination; // Pagination 타입 명시
}

const initialState: ArticleState = {
  articles: [],
  currentArticle: null,
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
      })

      // 게시글 상세 조회
      .addCase(fetchArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentArticle = null; // 초기화
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload; // 상세 데이터 저장
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch the article.";
      });
  },
});

export default articleSlice.reducer;