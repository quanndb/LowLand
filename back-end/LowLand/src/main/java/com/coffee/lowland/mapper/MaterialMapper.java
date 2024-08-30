package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.response.material.MaterialDTO;
import com.coffee.lowland.model.Material;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface MaterialMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget Material res, MaterialDTO req);
}
