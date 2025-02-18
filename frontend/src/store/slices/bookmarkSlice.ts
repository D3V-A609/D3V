// store/slices/bookmarkSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBookmarks, createBookmark, updateBookmark, toggleBookmark } from '../actions/bookmarkActions';

interface BookmarkState {
  bookmarks: Bookmark[];
  selectedBookmarks: number[];
  loading: boolean;
  error: string | null;
}

const initialState: BookmarkState = {
  bookmarks: [],
  selectedBookmarks: [],
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
      .addCase(createBookmark.fulfilled, (state, action: PayloadAction<Bookmark>) => {
        state.bookmarks.push(action.payload);
      })
      .addCase(updateBookmark.fulfilled, (state, action: PayloadAction<Bookmark>) => {
        const index = state.bookmarks.findIndex(b => b.bookmarkId === action.payload.bookmarkId);
        if (index !== -1) {
          state.bookmarks[index] = action.payload;
        }
      })
      .addCase(toggleBookmark.fulfilled, (state, action: PayloadAction<{ bookmarkId: number; added: boolean }>) => {
        if (action.payload.added) {
          state.selectedBookmarks.push(action.payload.bookmarkId);
        } else {
          state.selectedBookmarks = state.selectedBookmarks.filter(id => id !== action.payload.bookmarkId);
        }
      });
  },
});

export default bookmarkSlice.reducer;