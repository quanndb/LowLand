package com.coffee.lowland.DTO;

import com.coffee.lowland.DTO.response.ProductDetailResponse;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductImage;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailsDTO {
    Optional<Product> product;
    List<ProductDetailResponse> details;
    List<ProductImage> images;
}
