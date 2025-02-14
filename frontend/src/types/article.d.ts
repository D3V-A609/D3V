interface ArticleItem{ // 마이 페이지 용용
  id: number;
  categoryId: number;
  name: string;
  title: string;
  createdAt:string;
  updatedAt: string | null;
  view: number;
  commentCount: number;
}

interface Article {
  id: number;
  categoryId: number;
  memberId: number;
  name: string;
  title: string;
  content: string;
  images?: { id: number; originImageName: string; imageUrl: string }[];
  createdAt: string;
  updatedAt: string | null;
  view: number;
  commentCount: number;
}


interface ArticlePagination {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

interface ArticleComment {
  id: number;
  articleId: number;
  memberId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}