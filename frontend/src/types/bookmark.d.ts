// types/bookmark.d.ts

// 북마크 접근 권한 타입
type AccessLevel = 'PUBLIC' | 'PRIVATE' | 'FRIENDS';

// 북마크 데이터 타입
interface BookmarkData {
  name: string;
  description: string;
  access_level: AccessLevel;
}

// 북마크 리스트 아이템 타입
interface BookmarkList {
  bookmarkId: number;
  name: string;
  description: string;
  access_level: AccessLevel;
}

// 북마크 모달 props 타입
interface BookmarkModalProps {
  questionId: number;
  onClose: () => void;
}

// 북마크 추가 모달 props 타입
interface AddBookmarkModalProps {
  onClose: () => void;
  onSave?: (bookmarkData: BookmarkData) => void;
}
