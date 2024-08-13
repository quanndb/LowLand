package com.coffee.lowland.DTO.response.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductImageResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String productImageId;
    String imageUrl;
    String cloudImageId;
    String imageName;
}
