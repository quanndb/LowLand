package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.ProductRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRecipeRepository extends JpaRepository<ProductRecipe, String> {
    List<ProductRecipe> findAllByProductId(String productId);
}
