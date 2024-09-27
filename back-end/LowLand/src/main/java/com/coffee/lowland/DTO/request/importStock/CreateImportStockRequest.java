package com.coffee.lowland.DTO.request.importStock;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateImportStockRequest {
    String supplierName;
    String description;
    List<DetailsImportStockRequest> materialsList;
}
