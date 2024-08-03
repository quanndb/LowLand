package com.coffee.lowland.repository;

import com.coffee.lowland.model.ImportStock;
import com.coffee.lowland.model.ImportStockDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImportStockDetailsRepository extends JpaRepository<ImportStockDetails, String> {
    List<ImportStockDetails> findAllByImportStockId(String importStockId);
}
