package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, String> {
    List<ProductType> findByTypeNameContainsIgnoreCase(String query);
    Optional<ProductType> findByTypeNameIgnoreCase(String typeName);
    boolean existsByTypeNameIgnoreCase(String typeName);
}
