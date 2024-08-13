package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.response.product.ProductImageResponse;
import com.coffee.lowland.model.ProductImage;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {

    List<ProductImageResponse> toListProductImageResponse(List<ProductImage> req);
}
