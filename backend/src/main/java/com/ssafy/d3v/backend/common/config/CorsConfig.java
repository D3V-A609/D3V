package com.ssafy.d3v.backend.common.config;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://d3vtest.s3-website.ap-northeast-2.amazonaws.com"));  // ✅ 허용할 Origin 설정
        config.setAllowedMethods(List.of("GET", "POST", "OPTIONS", "PUT", "DELETE"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);  // ✅ withCredentials 지원

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
