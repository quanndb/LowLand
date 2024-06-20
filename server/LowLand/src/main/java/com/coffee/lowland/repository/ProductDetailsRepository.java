package com.coffee.lowland.repository;

import com.coffee.lowland.model.ProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailsRepository extends JpaRepository<ProductDetails, Integer> {
    Optional<List<ProductDetails>> findByProductId(int productId);
    void deleteAllByProductId(int ProductId);
}
