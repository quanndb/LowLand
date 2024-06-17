package com.coffee.lowland.repository;

import com.coffee.lowland.model.ProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDetailsRepository extends JpaRepository<ProductDetails, Integer> {
}
