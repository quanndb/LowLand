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
    List<Object[]> spGetToltalMoneyDayinMonth(int monthInput, int yearInput);
    @Procedure
    List<Object[]> spGetTopProduct(int topProduct, int typeOrder);
    // typeOrder = 0 San pham ban it nhat
    // typeOrder = 1 San pham ban nhieu nhat
    // topProduct số sản phẩm lấy ra Ví dụ Top5-10-15 sản phẩm nhieefu/ít nhất
}
