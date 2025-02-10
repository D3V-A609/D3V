// src/store/actions/articleActions.tsx
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params?: { category?: string; page?: number; keyword?: string }) => {
    const response = await axios.get("/api/article", { params });
    return response.data; // Ensure API response matches your Redux state structure
  }
);
