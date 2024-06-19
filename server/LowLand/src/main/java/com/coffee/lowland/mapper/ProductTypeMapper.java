package com.coffee.lowland.mapper;

import com.coffee.lowland.model.ProductType;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductTypeMapper {
    void updatePT(@MappingTarget ProductType res, ProductType req);
}
