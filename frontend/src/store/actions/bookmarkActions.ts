// store/actions/bookmarkActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import bookmarkApi from '../services/bookmarkApi';

export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetchAll',
  async (questionId: number) => {
    const response = await bookmarkApi.getBookmarks(questionId);
    return response;
  }
);

// 북마크 추가 액션
export const createBookmark = createAsyncThunk(
  'bookmarks/create',
  async (data: { name: string; description?: string; accessLevel: string }) => {
    const response = await bookmarkApi.createBookmark(data);
    return response;
  }
);

export const updateBookmark = createAsyncThunk(
  'bookmarks/update',
  async (data: UpdateBookmarkRequest) => {
    const response = await bookmarkApi.updateBookmark(data);
    return response;
  }
);

export const toggleBookmark = createAsyncThunk(
  'bookmarks/toggle',
  async ({ bookmarkId, questionId }: { bookmarkId: number; questionId: number }) => {
    const response = await bookmarkApi.toggleBookmark(bookmarkId, questionId);
    return { ...response, bookmarkId };
  }
);