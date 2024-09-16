package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.ImportStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImportStockRepository extends JpaRepository<ImportStock, String> {
}
