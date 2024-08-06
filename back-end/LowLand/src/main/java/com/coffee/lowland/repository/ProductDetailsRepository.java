package com.coffee.lowland.repository;

import com.coffee.lowland.model.ProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailsRepository extends JpaRepository<ProductDetails, String> {
    Optional<List<ProductDetails>> findByProductId(String productId);
    @Procedure
    List<Object[]> spGetAllProductDetailByProductId(String ProductId);
}
