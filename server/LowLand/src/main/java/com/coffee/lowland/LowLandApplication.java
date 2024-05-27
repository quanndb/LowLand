package com.coffee.lowland;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LowLandApplication {

//	@Value("${PAYOS_CLIENT_ID}")
//	private String clientId;
//
//	@Value("${PAYOS_API_KEY}")
//	private String apiKey;
//
//	@Value("${PAYOS_CHECKSUM_KEY}")
//	private String checksumKey;
//
//	@Bean
//	public PayOS payOS() {
//		return new PayOS(clientId, apiKey, checksumKey);
//	}

	public static void main(String[] args) {
		SpringApplication.run(LowLandApplication.class, args);
	}

}