package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.ImportStockDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImportStockDetailsRepository extends JpaRepository<ImportStockDetails, String> {
    List<ImportStockDetails> findAllByImportStockId(String importStockId);

    void deleteAllByImportStockId(String importStockId);
}
