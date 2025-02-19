interface Bookmark {
  bookmarkId: number;
  name: string;
  description?: string;
  accessLevel: 'PUBLIC' | 'PRIVATE' | 'PROTECTED';
  questions: { questionId: number; content: string; skill: string}[];
  questionCount?: number;
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