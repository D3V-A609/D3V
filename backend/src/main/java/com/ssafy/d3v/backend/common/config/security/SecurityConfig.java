package com.ssafy.d3v.backend.common.config.security;

//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource)
//            throws Exception {
//        http
//                .csrf(csrf -> csrf.disable())
//                // CorsConfigurationSource 빈을 주입 받아 사용
//                .cors(cors -> cors.configurationSource(corsConfigurationSource))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/**").permitAll()
//                        .anyRequest().permitAll()
//                );
//        return http.build();
//    }
//
//}
