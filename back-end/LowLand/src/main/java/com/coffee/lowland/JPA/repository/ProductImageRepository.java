package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, String> {
    List<ProductImage> findAllByProductId(String ProductId);
}
