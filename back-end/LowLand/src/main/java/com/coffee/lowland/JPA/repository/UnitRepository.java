package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnitRepository extends JpaRepository<Unit, String> {
    List<Unit> findAllByUnitNameContainsIgnoreCase(String query);
    Optional<Unit> findByUnitNameIgnoreCase(String unitName);
    boolean existsByUnitNameIgnoreCase(String unitName);
}
