package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.request.product.ProductDto;
import com.coffee.lowland.DTO.request.productType.ProductSizeDto;
import com.coffee.lowland.DTO.request.productType.ProductTypeDto;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductTypeMapper {
    ProductDto MapProductDto(ProductDto dataDto);
    void MapProductType(@MappingTarget ProductType res, ProductTypeDto req);
    void MapProductSize(@MappingTarget ProductSize res, ProductSizeDto req);
    void MapProduct(@MappingTarget Product res, ProductDto req);

}
