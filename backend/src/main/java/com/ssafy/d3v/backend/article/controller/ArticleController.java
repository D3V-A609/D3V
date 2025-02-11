package com.ssafy.d3v.backend.article.controller;

import com.ssafy.d3v.backend.article.dto.ArticleDetailResponse;
import com.ssafy.d3v.backend.article.dto.ArticleResponse;
import com.ssafy.d3v.backend.article.service.ArticleService;
import com.ssafy.d3v.backend.common.dto.PagedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/article")
@Tag(name = "게시글", description = "게시글 API")
public class ArticleController {
    private final ArticleService articleService;

    @Operation(summary = "카테고리별 게시글 조회")
    @GetMapping
    public ResponseEntity<PagedResponse<ArticleResponse>> get(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "15") int size,
            @RequestParam(value = "sort", defaultValue = "LATEST") String sort) {
        return ResponseEntity.ok().body(articleService.get(category, keyword, page, size, sort));
    }

    @Operation(summary = "게시글 생성")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ArticleDetailResponse> create(@RequestParam("category_id") long categoryId,
                                                        @RequestParam("title") String title,
                                                        @RequestParam("content") String content,
                                                        @Parameter(description = "업로드할 이미지 파일", content = @Content(mediaType = "multipart/form-data"))
                                                        @RequestParam(value = "images", required = false) List<MultipartFile> image) {
        return ResponseEntity.status(HttpStatus.CREATED).body(articleService.create(categoryId, title, content, image));
    }

    @Operation(summary = "게시글 상세 조회")
    @GetMapping("/{article_id}")
    public ResponseEntity<ArticleDetailResponse> getDetail(@PathVariable("article_id") long articleId) {
        return ResponseEntity.ok().body(articleService.getDetail(articleId));
    }

    @Operation(summary = "게시글 수정")
    @PatchMapping(value = "/{article_id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ArticleDetailResponse> update(@PathVariable("article_id") long articleId,
                                                        @RequestParam("category_id") long categoryId,
                                                        @RequestParam("title") String title,
                                                        @RequestParam("content") String content,
                                                        @Parameter(description = "업로드할 이미지 파일", content = @Content(mediaType = "multipart/form-data"))
                                                        @RequestParam(value = "images", required = false) List<MultipartFile> image) {
        return ResponseEntity.ok().body(articleService.update(articleId, categoryId, title, content, image));
    }

    @Operation(summary = "게시글 삭제")
    @DeleteMapping("/{article_id}")
    public ResponseEntity delete(@PathVariable("article_id") long articleId) {
        articleService.delete(articleId);
        return ResponseEntity.ok().build();
    }
}
