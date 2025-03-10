import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchArticles, fetchArticle, createArticle, fetchMyArticles, fetchMyArticleComments, updateArticle, deleteArticle } from "../actions/articleActions";

export interface ArticleState {
  articles: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
  pagination: ArticlePagination;

  myArticles: ArticleItem[];
  myArticleComments: ArticleComment[];
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
  myArticles: [],
  myArticleComments: []
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
      })

      // 글쓰기 기능 추가
      .addCase(createArticle.pending, (state) => {
        state.loading = true; // 글쓰기 요청 중 로딩 상태 활성화
        state.error = null; // 에러 초기화
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false; // 요청 완료 후 로딩 상태 비활성화
        state.error = null; // 에러 초기화
        if (action.payload) {
          // 새로 생성된 게시글을 목록에 추가
          state.articles.unshift(action.payload);
        }
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false; // 요청 실패 후 로딩 상태 비활성화
        state.error = action.payload as string; // 에러 메시지 저장
      })

      // 내 게시글 목록 불러오기
      .addCase(fetchMyArticles.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchMyArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null; 
        state.myArticles = action.payload;
      })
      .addCase(fetchMyArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 내가 작성한 게시글 댓글 목록 불러오기
      .addCase(fetchMyArticleComments.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchMyArticleComments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null; 
        state.myArticleComments = action.payload;
      })
      .addCase(fetchMyArticleComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 게시글 수정
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
        const index = state.articles.findIndex(article => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update the article.";
      })

      // 게시글 삭제
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = state.articles.filter(article => article.id !== action.payload);
        state.currentArticle = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete the article.";
      });

  },
});

export const { updateArticleInList } = articleSlice.actions;
export default articleSlice.reducer;