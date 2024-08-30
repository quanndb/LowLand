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
public class CreateProductRecipe {
    @NotBlank(message = "PRODUCT_FIELDS_NOT_BLANK")
    String materialName;

    @NotNull(message = "PRODUCT_FIELDS_NOT_BLANK")
    @Min(value = 10, message = "INVALID_MATERIAL_IN_PRODUCT")
    Double quantity;
}
