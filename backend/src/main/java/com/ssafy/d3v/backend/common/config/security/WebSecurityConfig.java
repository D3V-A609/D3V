package com.ssafy.d3v.backend.common.config.security;

import com.ssafy.d3v.backend.common.jwt.JwtAuthenticationFilter;
import com.ssafy.d3v.backend.common.jwt.JwtTokenProvider;
import com.ssafy.d3v.backend.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.ssafy.d3v.backend.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.ssafy.d3v.backend.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ssafy.d3v.backend.oauth.service.CustomOAuth2UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    private final CustomOAuth2UserService oAuth2UserService;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate<String, String> redisTemplate;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() { // security를 적용하지 않을 리소스
        return web -> web.ignoring()
                // error endpoint를 열어줘야 함, favicon.ico 추가!
                .requestMatchers("/error", "/favicon.ico");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/actuator/**",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/api/member/login",
                                "/api/member/signup",
                                "/api/member/email/**",
                                "/api/member/token",
                                "/api/question/daily",
                                "/api/question/top10",
                                "/api/job/**",
                                "/api/**"
                        )
                        .permitAll())
//                        .requestMatchers("/api/**").hasAnyRole("USER", "ADMIN"))
                .oauth2Login(oauth2 -> oauth2
                        .authorizationEndpoint(authEndpoint -> authEndpoint
                                .baseUri("/api/oauth2/authorization")
                                .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository()))
                        .redirectionEndpoint(redirection -> redirection
                                .baseUri("/api/*/oauth2/code/*"))
                        .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserService))
                        .successHandler(oAuth2AuthenticationSuccessHandler())
                        .failureHandler(oAuth2AuthenticationFailureHandler()));

        httpSecurity.addFilterBefore(
                new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate),
                UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    // Spring Security 5.7 이상에서는 AuthenticationManager를 직접 Bean으로 등록해야 함
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    // 암호화에 필요한 PasswordEncoder Bean 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
     * 쿠키 기반 인가 Repository
     * 인가 응답을 연계 하고 검증할 때 사용.
     * */
    @Bean
    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
    }

    /*
     * Oauth 인증 성공 핸들러
     * */
    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler(
                oAuth2AuthorizationRequestBasedOnCookieRepository(),
                jwtTokenProvider,
                redisTemplate);
    }

    /*
     * Oauth 인증 실패 핸들러
     * */
    @Bean
    public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
        return new OAuth2AuthenticationFailureHandler(oAuth2AuthorizationRequestBasedOnCookieRepository());
    }


    // CORS 허용 적용
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 허용할 Origin 설정 (와일드카드 제거, 정확한 도메인만 허용)
        configuration.setAllowedOriginPatterns(List.of(
                "https://i12a609.p.ssafy.io/",
                "https://d3v.asia",
                "http://localhost:5173"
        ));

        // 허용할 HTTP Method 설정
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        // 허용할 Header 설정
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        // 인증 정보를 포함한 요청 허용
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
