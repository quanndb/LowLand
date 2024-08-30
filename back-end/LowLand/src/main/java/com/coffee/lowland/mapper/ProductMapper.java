package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.request.product.CreateProductData;
import com.coffee.lowland.model.Product;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "isActive", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void createProduct(@MappingTarget Product res, CreateProductData req);
}
