package com.coffee.lowland.DTO.response.product;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    @Id
    String productId;
    String productName;
    int price;
    String typeName;
    String description;
    boolean isActive;
    String imageName;
    String imageUrl;
}
