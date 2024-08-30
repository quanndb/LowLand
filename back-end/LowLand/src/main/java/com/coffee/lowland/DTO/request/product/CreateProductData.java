package com.coffee.lowland.DTO.request.product;

import com.coffee.lowland.DTO.request.productType.ProductTypeDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateProductData {
    @NotBlank(message = "PRODUCT_FIELDS_NOT_BLANK")
    String productName;
    Boolean isActive;
    String description;
    @NotNull(message = "PRODUCT_FIELDS_NOT_BLANK")
    ProductTypeDto type;
}
