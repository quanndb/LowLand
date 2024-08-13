package com.coffee.lowland.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String productImageId;
    String imageUrl;
    String cloudImageId;
    String imageName;
    String productId;
}
