package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.ProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailsRepository extends JpaRepository<ProductDetails, String> {
    List<ProductDetails> findByProductIdAndIsActiveOrderByPrice(String productId,Boolean isActive);

}
