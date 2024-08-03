package com.coffee.lowland.DTO.request.product;

import com.coffee.lowland.model.ProductDetails;
import com.coffee.lowland.model.ProductRecipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDataDto extends ProductDto {
    List<ProductRecipe> listRecipes;
    List<ProductDetails> listDetails;
}
