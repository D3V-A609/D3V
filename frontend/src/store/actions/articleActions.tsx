import { createAsyncThunk } from "@reduxjs/toolkit";
import { articleApi } from "../services/articleApi";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params?: { category?: string; page?: number; size?: number; sort?: string; order?: 'ASC' | 'DESC'; keyword?: string }) => {
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

// 게시글 생성 액션
export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await articleApi.createArticle(formData);
      return response.data;
    } catch (error) {
      console.error("Error creating article:", error);
      return rejectWithValue("게시글 생성에 실패했습니다.");
    }
  }
);

// 게시글 수정 액션
export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async ({ id, data }: { id: number; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await articleApi.updateArticle(id, data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("게시글 수정에 실패했습니다.");
    }
  }
);

// 게시글 삭제 액션
export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (id: number, { rejectWithValue }) => {
    try {
      await articleApi.deleteArticle(id);
      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue("게시글 삭제에 실패했습니다.");
    }
  }
);