// src/store/slices/commentSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchComments, createComment } from "../actions/commentActions";

export interface Comment {
  id: number;
  articleId: number;
  memberId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  pagination: {
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
  },
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data || [];
        state.pagination = action.payload.pagable || initialState.pagination;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments.";
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.loading = false;
        state.comments.unshift(action.payload);
        state.pagination.totalRecords += 1;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create comment.";
      });
  },
});

export default commentSlice.reducer;
