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
