package com.coffee.lowland.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${app.origin-client}")
    private String ORIGIN_CLIENT;
    @Value("${app.origin-admin}")
    private String ORIGIN_ADMIN;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(ORIGIN_CLIENT, ORIGIN_ADMIN)
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}