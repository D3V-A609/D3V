import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchArticles, fetchArticle } from "../actions/articleActions";

export interface Article {
  id: number;
  categoryId: number;
  memberId: number;
  name: string;
  title: string;
  content: string;
  images?: { id: number; originImageName: string; imageUrl: string }[];
  createdAt: string;
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
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
  pagination: Pagination;
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
  reducers: {
    updateArticleInList: (state, action: PayloadAction<Article>) => {
      const index = state.articles.findIndex(article => article.id === action.payload.id);
      if (index !== -1) {
        state.articles[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.data || [];
        state.pagination = action.payload.pagable || initialState.pagination;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch articles.";
      })
      .addCase(fetchArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentArticle = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
        const index = state.articles.findIndex(article => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch the article.";
      });
  },
});

export const { updateArticleInList } = articleSlice.actions;
export default articleSlice.reducer;