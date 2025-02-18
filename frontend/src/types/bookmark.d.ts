// types/bookmark.d.ts

interface Bookmark {
    bookmarkId: number;
    name: string;
    accessLevel: 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
    questionCount: number;
  }
  
  interface BookmarkResponse {
    bookmarks: Bookmark[];
    selectedBookmarks: number[];
  }
  
  interface CreateBookmarkRequest {
    name: string;
    accessLevel: 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
  }
  
  interface UpdateBookmarkRequest {
    bookmarkId: number;
    name?: string;
    accessLevel?: 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
  }