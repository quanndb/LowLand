package com.coffee.lowland.repository;

import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Integer> {
    @Override
    Optional<ProductSize> findById(Integer integer);

    Optional<ProductSize> findBySizeName(String code);

    @Procedure
    List<ProductSize> spGetAllProductSize(String keyWord, int pageNumber);
}
