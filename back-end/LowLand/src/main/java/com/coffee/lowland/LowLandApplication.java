package com.coffee.lowland;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableFeignClients
@EnableJpaRepositories(basePackages = "com.coffee.lowland.JPA.repository")
@EnableMongoRepositories(basePackages = "com.coffee.lowland.Mongo.repository")
public class LowLandApplication {
	public static void main(String[] args) {
		SpringApplication.run(LowLandApplication.class, args);
	}
}