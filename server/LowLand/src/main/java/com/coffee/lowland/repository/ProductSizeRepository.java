package com.coffee.lowland.repository;

import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Integer> {
    ProductSize findBySizeName(String code);

    @Procedure
    List<ProductType> spGetAllProductSize(String keyWord, int pageNumber);
}
