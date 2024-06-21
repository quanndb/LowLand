package com.coffee.lowland.repository;

import com.coffee.lowland.model.ImportStock;
import com.coffee.lowland.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImportStockRepository extends JpaRepository<ImportStock, Integer> {
    Optional<ImportStock> findByImportStockCode(String importStockCode);
}
