package com.coffee.lowland.DTO.response.importStock;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DetailsImportMaterialResponse {
    String detailsId;
    String importStockId;
    String materialName;
    String unitName;
    String description;
    Long quantity;
    Long price;
    Long total;
}
