import { createAsyncThunk } from '@reduxjs/toolkit';
import bookmarkApi from '../services/bookmarkApi';

export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetchAll',
  async (questionId: number) => {
    const response = await bookmarkApi.getBookmarks(questionId);
    return response;
  }
);

export const fetchAllBookmarks = createAsyncThunk(
  'bookmarks/fetchAllBookmarks',
  async (memberId: number) => {
    const response = await bookmarkApi.getAllBookmarks(memberId);
    return response;
  }
);

export const createBookmark = createAsyncThunk(
  'bookmarks/create',
  async (data: CreateBookmarkRequest) => {
    const response = await bookmarkApi.createBookmark(data);
    return response;
  }
);

export const updateSingleQuestionBookmarks = createAsyncThunk(
  'bookmarks/updateSingleQuestionBookmarks',
  async ({ questionId, bookmarkIds }: { questionId: number; bookmarkIds: number[] }) => {
    const response = await bookmarkApi.updateSingleQuestionBookmarks(questionId, bookmarkIds);
    return response;
  }
);

export const addQuestionsToBookmarks = createAsyncThunk(
  'bookmarks/addQuestionsToBookmarks',
  async ({ bookmarkIds, questionIds }: { bookmarkIds: number[]; questionIds: number[] }) => {
    const promises = bookmarkIds.map(bookmarkId => 
      bookmarkApi.addQuestionsToBookmark(bookmarkId, questionIds)
    );
    await Promise.all(promises);
  }
);

export const fetchBookmarkById = createAsyncThunk(
  'bookmarks/fetchById',
  async (bookmarkId: number) => {
    const response = await bookmarkApi.fetchBookmarkById(bookmarkId);
    return response;
  }
);

export const deleteBookmarkById = createAsyncThunk(
  'bookmarks/deleteById',
  async (bookmarkId: number) => {
    const response = await bookmarkApi.deleteBookmarkById(bookmarkId);
    return response.message;
  }
);

export const deleteBookmarkQuestion = createAsyncThunk(
  'bookmarks/deleteBookmarkQuestion',
  async ({ bookmarkId, questionId }: { bookmarkId: number; questionId: number }) => {
    await bookmarkApi.deleteBookmarkQuestion(bookmarkId, questionId);
    return { bookmarkId, questionId };
  }
);

export const updateBookmarkById = createAsyncThunk(
  'bookmarks/updateBookmark',
  async ({ bookmarkId, data }: { bookmarkId: number; data: { name?: string; description?: string; accessLevel?:string } }) => {
    const response = await bookmarkApi.updateBookmark(bookmarkId, data);
    return response;
  }
);