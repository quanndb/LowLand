package com.coffee.lowland;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class LowLandApplication {
	public static void main(String[] args) {
		SpringApplication.run(LowLandApplication.class, args);
	}
}