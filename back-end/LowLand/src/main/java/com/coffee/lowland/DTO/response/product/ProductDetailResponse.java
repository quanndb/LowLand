package com.coffee.lowland.DTO.response.product;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailResponse {
    String productId;
    Double price;
    Double salePrice;
    String sizeName;
    String productSizeId;
    String productDetailsId;
}
