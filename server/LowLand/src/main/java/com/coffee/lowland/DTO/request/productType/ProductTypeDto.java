package com.coffee.lowland.DTO.request.productType;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductTypeDto {
    int productTypeId;
    String code;
    String typeName;
    String description;
}
