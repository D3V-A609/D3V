// src/types/article.d.ts

export interface Article {
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
  