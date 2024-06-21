package com.coffee.lowland.repository;

import com.coffee.lowland.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MaterialRepository extends JpaRepository<Material, Integer> {
    Optional<Material> findByMaterialName(String name);
}
