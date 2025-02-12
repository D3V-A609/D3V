package com.ssafy.d3v.backend.common.config;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // 프론트엔드 도메인
        configuration.setAllowedOrigins(List.of("http://d3vtest.s3-website.ap-northeast-2.amazonaws.com"));
        // 허용할 HTTP 메서드
        configuration.setAllowedMethods(List.of("GET", "POST", "OPTIONS", "PUT", "DELETE"));
        // 허용할 요청 헤더
        configuration.setAllowedHeaders(List.of("Content-Type", "Authorization"));
        // 인증 정보를 포함한 요청 허용
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 모든 경로에 대해 설정 적용
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
