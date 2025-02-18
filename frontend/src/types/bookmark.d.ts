interface Bookmark {
  bookmarkId: number;
  name: string;
  accessLevel: 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
  questionCount: number;
  description?: string;
}

interface BookmarkResponse {
  bookmarks: Bookmark[];
  selectedBookmarks: number[];
  description?: string;
}

interface CreateBookmarkRequest {
  name: string;
  accessLevel: 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
  description?: string;
}

interface UpdateBookmarkRequest {
  bookmarkId: number;
  name?: string;
  accessLevel?: 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
  description?: string;
}