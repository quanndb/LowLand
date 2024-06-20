package com.coffee.lowland.DTO.response.product;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductRespone {
    int productId;
    String code;
    String productName;
    boolean isActive;
    String description;
    String productTypeName;
    int price;
    String sizeName;
    String imageName;
    String imageUrl;
}
