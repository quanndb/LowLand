package com.coffee.lowland.DTO.response.importStock;

import com.coffee.lowland.model.Material;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImportStockDetailsResponse {
    String importStockId;
    String importCode;
    String supplierName;
    String description;
    LocalDateTime importDate;
    List<DetailsImportMaterialResponse> materialsList;
    Long totalPrice;
}
