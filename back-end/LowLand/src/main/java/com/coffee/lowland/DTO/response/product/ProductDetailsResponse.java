package com.coffee.lowland.DTO.response.product;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailsResponse{
    String productId;
    String productName;
    String description;
    Boolean isActive;
    String typeName;
    List<ProductImageResponse> images;
    List<ProductRecipeDetailsResponse> recipes;
    List<ProductDetailResponse> sizesAndPrices;
}
