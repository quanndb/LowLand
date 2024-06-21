package com.coffee.lowland.repository;

import com.coffee.lowland.model.ImportStock;
import com.coffee.lowland.model.ImportStockDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImportStockDetailsRepository extends JpaRepository<ImportStockDetails, Integer> {
    Optional<List<ImportStockDetails>> findAllByImportStockId(Integer importStockId);
}
