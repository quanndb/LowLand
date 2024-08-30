package com.coffee.lowland.DTO.request.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateProductDetails {
    String productDetailsId;
    @NotBlank(message = "PRODUCT_FIELDS_NOT_BLANK")
    String sizeName;

    @Min(value = 10000, message = "PRODUCT_PRICE_AT_LEAST")
    @NotNull(message = "PRODUCT_FIELDS_NOT_BLANK")
    Double price;

    Double salePrice;
}
