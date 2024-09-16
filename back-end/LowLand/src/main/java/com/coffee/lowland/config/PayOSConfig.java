package com.coffee.lowland.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vn.payos.PayOS;

@Configuration
public class PayOSConfig {
    @Bean
    public PayOS payos(@Value("${payos.client-id}") String clientId,
                       @Value("${payos.api-key}") String apiSecret,
                       @Value("${payos.checksum-key}") String checksumKey){
        return new PayOS(clientId, apiSecret, checksumKey);
    }
}
