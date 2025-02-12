import { createAsyncThunk } from "@reduxjs/toolkit";
import { articleApi } from "../services/articleApi";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params?: { category?: string; page?: number; size?: number; sort?: string; order?: 'asc' | 'desc'; keyword?: string }) => {
    try {
      const response = await articleApi.getArticles(params);
      return response.data;
    } catch (error) {
      console.log('in article action: ', error);
      throw new Error('게시글 목록을 불러오는데 에러가 발생했습니다.');
    }
  }
);

export const fetchArticle = createAsyncThunk(
  "articles/fetchArticle",
  async (articleId: number) => {
    const response = await articleApi.getArticleById(articleId);
    return response.data;
  }
);