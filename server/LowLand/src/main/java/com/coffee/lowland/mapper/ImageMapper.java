package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.CreateImageDTO;
import org.mapstruct.Mapper;

import java.awt.*;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    CreateImageDTO DataToCreateImageDTO(Object image);
}
