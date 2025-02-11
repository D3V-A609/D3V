// src/store/actions/articleActions.tsx
import { createAsyncThunk } from "@reduxjs/toolkit";
import { articleApi } from "../services/articleApi";

// 게시글 목록 조회 액션
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params?: { category?: string; page?: number; size?: number; sort?: string; keyword?: string }) => {
    const response = await articleApi.getArticles(params);
    return response.data; // API 응답 데이터 반환
  }
);
