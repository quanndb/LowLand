package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.ProductSize;
import com.coffee.lowland.model.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, String> {
    List<ProductSize> findAllBySizeNameContainsIgnoreCase(String query);
    Page<ProductSize> findAllBySizeNameContainsIgnoreCase(String query, Pageable pageable);
    Optional<ProductSize> findBySizeNameIgnoreCase(String sizeName);
    boolean existsBySizeNameIgnoreCase(String sizeName);
}
