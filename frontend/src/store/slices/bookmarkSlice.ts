import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBookmarks, createBookmark, updateSingleQuestionBookmarks, addQuestionsToBookmarks, fetchAllBookmarks, fetchBookmarkById, deleteBookmarkById } from '../actions/bookmarkActions';

interface BookmarkState {
  bookmarks: Bookmark[];
  selectedBookmarks: number[];
  selectedBookmark: Bookmark | null; // 단일 북마크 조회 결과를 저장
  loading: boolean;
  error: string | null;
}

const initialState: BookmarkState = {
  bookmarks: [],
  selectedBookmarks: [],
  selectedBookmark: null,
  loading: false,
  error: null,
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action: PayloadAction<BookmarkResponse>) => {
        state.loading = false;
        state.bookmarks = action.payload.bookmarks;
        state.selectedBookmarks = action.payload.selectedBookmarks;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '북마크를 불러오는데 실패했습니다.';
      })
      .addCase(fetchAllBookmarks.fulfilled, (state, action: PayloadAction<Bookmark[]>) => {
        state.loading = false;
        state.bookmarks = action.payload;
      })
      .addCase(createBookmark.fulfilled, (state, action: PayloadAction<Bookmark>) => {
        state.bookmarks.push(action.payload);
      })
      .addCase(updateSingleQuestionBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSingleQuestionBookmarks.fulfilled, (state, action: PayloadAction<BookmarkResponse>) => {
        state.loading = false;
        state.bookmarks = action.payload.bookmarks;
        state.selectedBookmarks = action.payload.selectedBookmarks;
        state.error = null;
      })
      .addCase(updateSingleQuestionBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '단일 질문 북마크 업데이트에 실패했습니다.';
      })
      .addCase(addQuestionsToBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestionsToBookmarks.fulfilled, (state) => {
        state.loading = false;
        state.selectedBookmarks = [];
        state.error = null;
      })
      .addCase(addQuestionsToBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '북마크에 질문 추가를 실패했습니다.';
      })
      .addCase(fetchBookmarkById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '단일 북마크를 불러오는데 실패했습니다.';
      })
      .addCase(deleteBookmarkById.fulfilled, (state, action) => {
        state.bookmarks = state.bookmarks.filter(b => b.bookmarkId !== action.meta.arg);
        state.loading = false;
        state.error = null;
      });
  },
});

export default bookmarkSlice.reducer;