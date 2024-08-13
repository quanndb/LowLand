package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.DTO.response.product.ProductResponse;
import com.coffee.lowland.model.Product;
import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
}