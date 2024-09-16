package com.coffee.lowland.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String productDetailsId;
    Double price;
    Double salePrice;
    String productId;
    String productSizeId;
    Boolean isActive;
}
