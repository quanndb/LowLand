package com.coffee.lowland.repository;

import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, String> {
    List<ProductImage> findAllByProductId(String ProductId);
}
