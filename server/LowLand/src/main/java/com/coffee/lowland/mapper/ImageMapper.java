package com.coffee.lowland.mapper;

import com.coffee.lowland.DTO.CreateImageDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.awt.*;
import java.util.Map;

@Mapper(componentModel = "spring")
public interface ImageMapper {
    default String getUrl(Object image) {
        if (image instanceof Map) {
            return (String) ((Map) image).get("url");
        }
        return null;
    }

    default String getPublicId(Object image) {
        if (image instanceof Map) {
            return (String) ((Map) image).get("public_id");
        }
        return null;
    }
}
