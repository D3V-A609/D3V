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
      throw new Error('게시글 목록을 불러오는데 문제가가 발생했습니다.');
    }
  }
);

export const fetchArticle = createAsyncThunk(
  "articles/fetchArticle",
  async (articleId: number, {rejectWithValue}) => {
    try{
      const response = await articleApi.getArticleById(articleId);
      return response.data;
    }catch(error){
      console.log('in article error 2: ', error);
      return rejectWithValue('게시글을 조회하는데 문제가 발생했습니다.')
    }
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
      console.error("in article action 3:", error);
      return rejectWithValue("게시글을 등록하는데 문제가 발생했습니다.");
    }
  }
);

// 내 게시글 조회
export const fetchMyArticles = createAsyncThunk(
  'articles/myArticles',
  async (memberId:number, {rejectWithValue}) => {
    try{
      const response = await articleApi.getMyArticles(memberId);
      return response.data;
    }catch(error){
      console.log("in acticle action 4: ", error)
      return rejectWithValue("내 게시글을 불러오는데 문제가 발생했습니다.")
    }
  }
);

// 내가 작성한 게시글 댓글 조회
export const fetMyArticleComments = createAsyncThunk(
  'articles/myArticleComments',
  async (memberId: number, {rejectWithValue}) => {
    try{
      const response = await articleApi.getMyArticleComments(memberId);
      return response.data;
    }catch(error){
      console.log('in article action 5: ', error)
      return rejectWithValue("내가 작성한 게시글 댓글을 불러오는데 문제가 발생했습니다.")
    }
  }
)