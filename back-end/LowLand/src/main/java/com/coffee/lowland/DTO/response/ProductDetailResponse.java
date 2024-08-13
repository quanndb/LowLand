package com.coffee.lowland.DTO.response;

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
    Double price;
    String sizeName;
    String productSizeId;
    String productDetailsId;
}
