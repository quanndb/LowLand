package com.coffee.lowland.repository;

import com.coffee.lowland.model.ProductImage;
import com.coffee.lowland.model.ProductRecipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRecipeRepository extends JpaRepository<ProductRecipe, Integer> {
    List<ProductRecipe> findAllByProductId(int productId);
}
