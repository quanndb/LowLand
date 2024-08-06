package com.coffee.lowland.DTO.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductDetailResponse {
    int price;
    String sizeName;
    String productSizeId;
    String productDetailsId;
}
