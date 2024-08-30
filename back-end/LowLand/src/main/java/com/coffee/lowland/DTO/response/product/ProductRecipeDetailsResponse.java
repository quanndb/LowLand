package com.coffee.lowland.DTO.response.product;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductRecipeDetailsResponse {
    String productId;
    String productRecipeId;
    String materialName;
    String unitName;
    Double quantity;
}
