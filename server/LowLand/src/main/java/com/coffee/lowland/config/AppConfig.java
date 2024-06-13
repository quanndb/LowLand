//package com.coffee.lowland.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.reactive.function.client.WebClient;
//
//@Configuration
//public class AppConfig {
//
//    @Value("${PAY_SERVER}")
//    String PAY_SERVER;
//
//    @Bean
//    public WebClient webClient() {
//        return WebClient.builder()
//                .baseUrl("")
//                .build();
//    }
//}
