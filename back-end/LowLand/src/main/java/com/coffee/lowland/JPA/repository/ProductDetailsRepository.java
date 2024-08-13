package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.ProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailsRepository extends JpaRepository<ProductDetails, String> {
    List<ProductDetails> findAllByProductId(String productId);

    void deleteAllByProductId(String productId);
}
