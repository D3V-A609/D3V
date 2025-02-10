package com.ssafy.d3v.backend.article.dto;

import lombok.Builder;

@Builder
public record ArticleRequest(long categeryId, String title, String content) {
}
