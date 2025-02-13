package com.ssafy.d3v.backend.article.service;

import com.ssafy.d3v.backend.article.dto.ArticleDetailResponse;
import com.ssafy.d3v.backend.article.dto.ArticleResponse;
import com.ssafy.d3v.backend.common.dto.PagedResponse;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ArticleService {
    PagedResponse<ArticleResponse> get(String category, String keyword, int page, int size, String sort, String order);

    ArticleDetailResponse create(long categoryId, String title, String content, List<MultipartFile> image);

    ArticleDetailResponse getDetail(long articleId);

    ArticleDetailResponse update(long articleId, long categoryId, String title, String content,
                                 List<MultipartFile> image);

    void delete(long articleId);
}
