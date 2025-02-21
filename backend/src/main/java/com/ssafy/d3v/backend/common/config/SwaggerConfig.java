package com.ssafy.d3v.backend.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI springD3VOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("D3V API")
                        .description("D3V(3 Daily Questions For Developers) service application")
                        .version("v0.0.1")
                        .license(new License().name("SSAFY D3V").url("https://lab.ssafy.com/s12-webmobile2-sub1")));
    }
}

