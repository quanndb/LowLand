package com.coffee.lowland.repository;

import com.coffee.lowland.model.ProductImage;
import com.coffee.lowland.model.ProductRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRecipeRepository extends JpaRepository<ProductRecipe, String> {
    List<ProductRecipe> findAllByProductId(String productId);
}
