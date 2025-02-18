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

export const addQuestionsToBookmarks = createAsyncThunk(
  'bookmarks/addQuestionsToBookmarks',
  async ({ bookmarkIds, questionIds }: { bookmarkIds: number[]; questionIds: number[] }) => {
    const promises = bookmarkIds.map(bookmarkId => 
      bookmarkApi.addQuestionsToBookmark(bookmarkId, questionIds)
    );
    await Promise.all(promises);
  }
);