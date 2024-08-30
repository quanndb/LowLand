package com.coffee.lowland.JPA.repository;

import com.coffee.lowland.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChartRepository extends JpaRepository<Material, String> {
    @Procedure
    List<Object[]> spGetTotalMoneyInMonth(int monthInput, int yearInput);
    @Procedure
    List<Object[]> spGetTotalStuff();
    @Procedure
    List<Object[]> spGetTopProduct(int topProduct);
}
