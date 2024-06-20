package com.coffee.lowland.repository;

import com.coffee.lowland.DTO.response.product.ProductRespone;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findByProductId(Integer productId);
    Optional<Product> findByCode(String code);
    @Procedure
    List<Object[]> spGetAllProductForView(int ProductID);
}