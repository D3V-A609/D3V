// src/store/actions/commentActions.tsx
import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentApi } from "../services/commentApi";

// 댓글 목록 조회 액션
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ articleId, page, size }: { articleId: number; page: number; size: number }) => {
    const response = await commentApi.getComments({ articleId, page, size });
    return response.data; // API 응답 데이터 반환
  }
);

// 댓글 작성 액션
export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ articleId, content }: { articleId: number; content: string }) => {
    const response = await commentApi.createComment(articleId, content);
    return response.data;
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ articleId, commentId, content }: { articleId: number; commentId: number; content: string }) => {
    const response = await commentApi.updateComment(articleId, commentId, content);
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ articleId, commentId }: { articleId: number; commentId: number }) => {
    await commentApi.deleteComment(articleId, commentId);
    return commentId;
  }
);