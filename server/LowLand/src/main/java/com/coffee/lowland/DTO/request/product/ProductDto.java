package com.coffee.lowland.DTO.request.product;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDto {
    int productId;
    String productName;
    boolean isActive;
    String description;
    int productTypeId;
}
