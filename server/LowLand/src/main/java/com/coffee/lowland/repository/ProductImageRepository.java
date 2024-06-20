package com.coffee.lowland.repository;

import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
}
