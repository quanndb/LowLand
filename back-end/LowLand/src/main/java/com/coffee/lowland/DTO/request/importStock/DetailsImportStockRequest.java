package com.coffee.lowland.DTO.request.importStock;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DetailsImportStockRequest {
    String materialName;
    String description;
    String unitName;
    Long quantity;
    Long price;
}
