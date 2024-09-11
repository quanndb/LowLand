package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialRepository extends JpaRepository<Material, String> {
    Optional<Material> findByMaterialNameIgnoreCase(String name);

    boolean existsByMaterialNameIgnoreCase(String materialName);
    List<Material> findAllByMaterialNameContainsIgnoreCase(String query);
    Page<Material> findAllByMaterialNameContainsIgnoreCase(String query, Pageable page);

    @Procedure
    List<Object[]> spGetMaterialInProductFromOrder(String orderId);
}
