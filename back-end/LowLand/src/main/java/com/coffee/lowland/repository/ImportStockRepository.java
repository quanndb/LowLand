package com.coffee.lowland.repository;

import com.coffee.lowland.model.ImportStock;
import com.coffee.lowland.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImportStockRepository extends JpaRepository<ImportStock, String> {
}
